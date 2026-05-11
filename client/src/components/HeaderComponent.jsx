import styles from "../styles/HeaderComponent.module.css";
import {
  ShoppingCart,
  LogOutIcon,
  UserIcon,
  ShoppingBagIcon,
  HomeIcon,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = {
  HOME: "HOME",
  ACCOUNT: "ACCOUNT",
  PRODUCTS: "PRODUCTS",
  LOGOUT: "LOGOUT",
};

const MIN_WIDTH_FOR_NAV = 769;
const MAX_WIDTH_FOR_NAV_MENU = 768;

export default function HeaderComponent() {
  const [selectedNavItem, setSelectedNavItem] = useState(navItems.HOME);
  const [showExpandedNav, setShowExpandedNav] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  function handleSelectNavItem(navItem) {
    setSelectedNavItem(navItem);

    if (showExpandedNav) {
      setShowExpandedNav(false);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <header className={styles.container}>
      <nav className={styles.navContainer}>
        <div className={styles.brandContainer}>
          <ShoppingCart className={styles.brandIcon} />
          <h1 className={styles.brandName}>shoplify</h1>
        </div>
        {(width >= MIN_WIDTH_FOR_NAV || showExpandedNav) && (
          <ul className={styles.navItems}>
            <li>
              <div
                className={
                  selectedNavItem === navItems.HOME
                    ? styles.navItemSelected
                    : styles.navItem
                }
                onClick={() => handleSelectNavItem(navItems.HOME)}
              >
                <button className={styles.navItemButton}>Home</button>
                <HomeIcon className={styles.navItemIcon} />
              </div>
            </li>
            <li>
              <div
                className={
                  selectedNavItem === navItems.PRODUCTS
                    ? styles.navItemSelected
                    : styles.navItem
                }
                onClick={() => handleSelectNavItem(navItems.PRODUCTS)}
              >
                <button className={styles.navItemButton}>Products</button>
                <ShoppingBagIcon className={styles.navItemIcon} />
              </div>
            </li>
            <li>
              <div
                className={
                  selectedNavItem === navItems.ACCOUNT
                    ? styles.navItemSelected
                    : styles.navItem
                }
                onClick={() => handleSelectNavItem(navItems.ACCOUNT)}
              >
                <button className={styles.navItemButton}>Account</button>
                <UserIcon className={styles.navItemIcon} />
              </div>
            </li>
            {width <= MAX_WIDTH_FOR_NAV_MENU && showExpandedNav && (
              <li>
                <div
                  className={
                    selectedNavItem === navItems.LOGOUT
                      ? styles.navItemSelected
                      : styles.navItem
                  }
                  onClick={() => handleSelectNavItem(navItems.LOGOUT)}
                >
                  <button className={styles.navItemButton}>Logout</button>
                  <LogOutIcon className={styles.navItemIcon} />
                </div>
              </li>
            )}
          </ul>
        )}
        {width >= MIN_WIDTH_FOR_NAV && (
          <div
            className={
              selectedNavItem === navItems.LOGOUT
                ? styles.navItemSelected
                : styles.navItem
            }
            onClick={() => handleSelectNavItem(navItems.LOGOUT)}
          >
            <button className={styles.navItemButton}>Logout</button>
            <LogOutIcon className={styles.navItemIcon} />
          </div>
        )}
        {width <= MAX_WIDTH_FOR_NAV_MENU && (
          <button
            className={
              showExpandedNav
                ? styles.navMenuButtonExpanded
                : styles.navMenuButtonCollapsed
            }
            onClick={() => setShowExpandedNav((prev) => !prev)}
          >
            <Menu className={styles.navMenuIcon} />
          </button>
        )}
      </nav>
    </header>
  );
}
