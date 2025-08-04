import dayjs from "dayjs";

import { openingHours } from "../../utils/opening-hours.js"
import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours");

// import { schedulesDay } from "../schedules/load.js"

export function hoursLoad({ date, dailySchedules }) {
  // Limpa a lista de horários.
  hours.innerHTML = "";

  //Obtém a lista de todos os horarios já agendados.
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm")
)

const opening = openingHours.map((hour) => {
// Recupera somente as horas.
  const [scheduleHour] = hour.split(":");

  // Adiciona a hora na date e verificar se está no passado.
  const isHourPast = dayjs( date ).add(scheduleHour, "hour").isBefore(dayjs());

  // Será considerado um horário disponível se NÃO ( ! ) esta na lista dos agendados nem no passado ( && !isHourPast).
  const available = !unavailableHours.includes(hour) && !isHourPast
 
  // Define se o horario esta disponivel.
  return {  
    hour,
    available,     
  }
});
  //Renderiza os horários.
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");

    //Aplica a classe de forma condicional.
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;

    // Adiciona o cabeçalho conforme a hora.
    if (hour === "9:00"){
hourHeaderAdd("Manhã");
    }else if (hour === "13:00"){
      hourHeaderAdd("Tarde");
    }else if (hour === "18:00"){
hourHeaderAdd("Noite");
    }
    hours.append(li);
  })

  // Adiciona o evento de clique nos horários disponíveis.
  hoursClick()
}

function hourHeaderAdd(title){
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;

  hours.append(header);
}