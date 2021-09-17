import styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom'

import packageJson from '../../../package.json'
import { PAGE_ROUTE } from '../../utils/enum'

import '../../components/buttons/button-base'

function NavBar() {
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.navbar__main}`}>
        <NavLink className={`${styles.navbar__logo}`} to={PAGE_ROUTE.LANDING}>
          <button-base type='primary' label='LOGO'></button-base>
        </NavLink>
        <NavLink
          className={`${styles.navbar__item}`}
          activeClassName={`${styles.navbar__item_is_active}`}
          to={PAGE_ROUTE.LANDING}
        >
          HOME
        </NavLink>
        <div className={`${styles.navbar__appVersion}`}>
          v{packageJson.version}
        </div>
      </div>

      <div className={`${styles.navbar__profile}`}></div>
    </div>
  )
}

export default NavBar
