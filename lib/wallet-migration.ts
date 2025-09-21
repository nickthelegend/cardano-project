import type { Web3Wallet } from "@meshsdk/web3-sdk"
import type { BlockfrostProvider } from "@meshsdk/core"

// User data structure from UTXOS auth
interface UTXOSUser {
  id: string
  walletAddress: string
  username: string
  scrollTokens: number
  vibeTokens: number
  dailyScrollCount: number
  lastScrollReset: string
  adaBalance: number
  isConnected: boolean
}

// Mesh wallet user data structure
interface MeshWalletUser {
  address: string
  username: string
  scrollTokens: number
  vibeTokens: number
  dailyScrollCount: number
  lastScrollReset: string
  adaBalance: number
  isConnected: boolean
  walletName?: string
}

/**
 * Migration utility to convert UTXOS user data to Mesh wallet format
 */
export class WalletMigration {
  private static readonly STORAGE_KEY = "scrollvibe_mesh_user"
  private static readonly UTXOS_STORAGE_KEY = "scrollvibe_utxos_user"

  /**
   * Migrate UTXOS user data to Mesh wallet format
   */
  static migrateUTXOSUser(): MeshWalletUser | null {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return null
    }

    try {
      const utxosUserData = localStorage.getItem(this.UTXOS_STORAGE_KEY)
      if (!utxosUserData) {
        console.log("No UTXOS user data found to migrate")
        return null
      }

      const utxosUser: UTXOSUser = JSON.parse(utxosUserData)
      console.log("Migrating UTXOS user data:", utxosUser.username)

      const meshUser: MeshWalletUser = {
        address: utxosUser.walletAddress,
        username: utxosUser.username,
        scrollTokens: utxosUser.scrollTokens,
        vibeTokens: utxosUser.vibeTokens,
        dailyScrollCount: utxosUser.dailyScrollCount,
        lastScrollReset: utxosUser.lastScrollReset,
        adaBalance: utxosUser.adaBalance,
        isConnected: utxosUser.isConnected,
      }

      // Save to new format
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(meshUser))

      // Remove old data
      localStorage.removeItem(this.UTXOS_STORAGE_KEY)

      console.log("Successfully migrated user data to Mesh format")
      return meshUser
    } catch (error) {
      console.error("Failed to migrate UTXOS user data:", error)
      return null
    }
  }

  /**
   * Get migrated user data
   */
  static getMigratedUser(): MeshWalletUser | null {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return null
    }

    try {
      const userData = localStorage.getItem(this.STORAGE_KEY)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error("Failed to get migrated user data:", error)
      return null
    }
  }

  /**
   * Save user data in Mesh format
   */
  static saveUserData(userData: Partial<MeshWalletUser>): void {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return
    }

    try {
      const existingData = this.getMigratedUser() || {}
      const updatedData = { ...existingData, ...userData }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData))
      console.log("Saved user data:", updatedData.username)
    } catch (error) {
      console.error("Failed to save user data:", error)
    }
  }

  /**
   * Clear all user data
   */
  static clearUserData(): void {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return
    }

    try {
      localStorage.removeItem(this.STORAGE_KEY)
      localStorage.removeItem(this.UTXOS_STORAGE_KEY)
      console.log("Cleared all user data")
    } catch (error) {
      console.error("Failed to clear user data:", error)
    }
  }

  /**
   * Check if migration is needed
   */
  static needsMigration(): boolean {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') {
      return false
    }

    const hasOldData = localStorage.getItem(this.UTXOS_STORAGE_KEY) !== null
    const hasNewData = localStorage.getItem(this.STORAGE_KEY) !== null
    return hasOldData && !hasNewData
  }

  /**
   * Perform complete migration process
   */
  static async performMigration(): Promise<MeshWalletUser | null> {
    if (this.needsMigration()) {
      console.log("Performing UTXOS to Mesh wallet migration...")
      return this.migrateUTXOSUser()
    } else if (this.getMigratedUser()) {
      console.log("User data already migrated")
      return this.getMigratedUser()
    } else {
      console.log("No migration needed")
      return null
    }
  }
}

/**
 * Hook to handle wallet migration and data persistence
 */
export function useWalletMigration() {
  const migrateUserData = () => {
    return WalletMigration.performMigration()
  }

  const saveUserData = (userData: Partial<MeshWalletUser>) => {
    WalletMigration.saveUserData(userData)
  }

  const getUserData = () => {
    return WalletMigration.getMigratedUser()
  }

  const clearUserData = () => {
    WalletMigration.clearUserData()
  }

  return {
    migrateUserData,
    saveUserData,
    getUserData,
    clearUserData,
  }
}