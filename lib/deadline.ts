
export const getColor = (deadline) => {
  let cardDate = new Date(deadline)
  let currentDate = new Date()

  if (currentDate < cardDate) {
    let dayPlus = new Date(24 * 3600 * 1000);
    if (dayPlus < cardDate) {
      // console.log("Больше дня")
      return "#a5a5a5a1"
    }
  } else {
    if (currentDate.getDay() == cardDate.getDay()) {
      // console.log("Остался один день")
      return "#D39D00"
    } else {
      // console.log("Просрочено")
      return "#b31f1f"
    }
  }
}