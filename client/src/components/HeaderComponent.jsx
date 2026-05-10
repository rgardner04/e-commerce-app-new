import styles from "../styles/HeaderComponent.module.css";
import {
  ShoppingCart,
  LogOutIcon,
  UserIcon,
  ShoppingBagIcon,
  HomeIcon,
} from "lucide-react";
import { useState } from "react";

const navItems = {
  HOME: "HOME",
  ACCOUNT: "ACCOUNT",
  PRODUCTS: "PRODUCTS",
  LOGOUT: "LOGOUT",
};

export default function HeaderComponent() {
  const [selectedNavItem, setSelectedNavItem] = useState(navItems.HOME);

  function handleNavItemSelect(navItem) {
    setSelectedNavItem(navItem);
  }

  return (
    <header className={styles.container}>
      <nav className={styles.navContainer}>
        <div className={styles.brandContainer}>
          <ShoppingCart className={styles.brandIcon} />
          <h1 className={styles.brandName}>shoplify</h1>
        </div>
        <ul className={styles.navItems}>
          <li>
            <div
              className={
                selectedNavItem === navItems.HOME
                  ? styles.navItemSelected
                  : styles.navItem
              }
              onClick={() => setSelectedNavItem(navItems.HOME)}
            >
              <button className={styles.navItemButton}>Home</button>
              <HomeIcon className={styles.navItemIcon} />
            </div>
          </li>
          <li>
            <div
              className={
                selectedNavItem === navItems.ACCOUNT
                  ? styles.navItemSelected
                  : styles.navItem
              }
              onClick={() => setSelectedNavItem(navItems.ACCOUNT)}
            >
              <button className={styles.navItemButton}>Account</button>
              <UserIcon className={styles.navItemIcon} />
            </div>
          </li>
          <li>
            <div
              className={
                selectedNavItem === navItems.PRODUCTS
                  ? styles.navItemSelected
                  : styles.navItem
              }
              onClick={() => setSelectedNavItem(navItems.PRODUCTS)}
            >
              <button className={styles.navItemButton}>Products</button>
              <ShoppingBagIcon className={styles.navItemIcon} />
            </div>
          </li>
        </ul>
        <div
          className={
            selectedNavItem === navItems.LOGOUT
              ? styles.navItemSelected
              : styles.navItem
          }
          onClick={() => setSelectedNavItem(navItems.LOGOUT)}
        >
          <button className={styles.navItemButton}>Logout</button>
          <LogOutIcon className={styles.navItemIcon} />
        </div>
      </nav>
    </header>
  );
}
