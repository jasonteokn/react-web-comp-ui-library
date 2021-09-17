import { Route, Switch, Redirect } from 'react-router-dom'
import styles from './Main.module.css'

import { PAGE_ROUTE } from '../../utils/enum'

//Pages
import Landing from '../landing/Landing'
import NavBar from '../navbar/NavBar'

function Main() {
  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.main__navbar}`}>
        <NavBar />
      </div>

      <div className={`${styles.main__content}`}>
        <Switch>
          <Route path={PAGE_ROUTE.LANDING} component={Landing} />
          <Route render={() => <Redirect to={PAGE_ROUTE.LANDING} />} />
        </Switch>
      </div>
    </div>
  )
}

export default Main
