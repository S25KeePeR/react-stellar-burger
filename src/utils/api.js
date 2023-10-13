import axios from 'axios';

const api = axios.create({
    baseURL: "https://norma.nomoreparties.space/api/"
});

export default api;



// const BurgerIngredients = () => {
  
//   const ingredientsEl = useRef(); // Используем useRef для отслеживания прокручиваемого элемента
//   const [highlighted, setHighlighted] = useState(); // Используем useState для отслеживания подсвеченного переключателя
  
//   useEffect(() => {
//     // Устанавливаем слушателя на прокрутку
//     const handleScroll = () => {
//         // Получаем позицию прокрутки
//         const { top } = ingredientsEl.current.getBoundingClientRect();
        
//         // Устанавливаем соответствующий переключатель как подсвеченный
//         const switchId = Math.min(
//             ['bunsSwitch', 'saucesSwitch', 'fillingsSwitch'],
//             // Сравниваем id переключателя с позицией прокрутки
//             // (переключатель с наименьшим значением будет подсвечен)
//             Math.max.apply(null, Array.from({ length: 3 }, (v, i) => {
//                 return top - i * 60; // Предполагаем, что каждый переключатель находится на расстоянии 60px от предыдущего
//             }))
//         );

//         setHighlighted(switchId);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
// }, []);

// return (
// <>
// <div ref={ingredientsEl} className='ingredients'>
// {/* Здесь должен быть код, отображающий ингредиенты */}
// </div>

//   {/* Переключатели */}
//   <div className="switches">
//     <div className={`switch ${highlighted === "bunsSwitch" ? "highlighted" : ""}`}>
//       <input
//         type="checkbox"
//         id="bunsSwitch"
//         name="buns"
//         onClick={() => {}}
//       />
//       <label htmlFor="buns">Булки</label>
//     </div>
    
//     <div
//       className={`switch ${highlighted === "saucesSwitch" ? 'highlighted' : ''}`}
//       >
//       <input
//       type='checkbox'
//       id='saucesSwitch'
//       name='sauces'
//       onClick={() => {}}
//       />
//       <label htmlFor='sauces'>Соусы</label>
//       </div>
      
//           <div
//             className={`switch ${highlighted === "fillingsSwitch" ? "highlighted" : ""}`}
//           >
//             <input
//               type="checkbox"
//               id="fillingsSwitch"
//               name="fillings"
//               onClick={() => {}}
//             />
//             <label htmlFor="fillings">Начинки</label>
//           </div>
//         </div>
//       </>
//       );
//       };
      
//       export default BurgerIngredients;