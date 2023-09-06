import styles from "./app.module.css";
// import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export default function App() {

  const classMain = `${styles.main} pl-5 pr-5 mb-10 `;

    return (
      <div className={styles.app}>
        <AppHeader />
        <main className={classMain}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </div>
    );

}