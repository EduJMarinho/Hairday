import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js"
const periods = document.querySelectorAll(".period");

// Gera evento Click para cada lista ( manhã, terde e noite).
periods.forEach((period) => {

  //Captura o evento Click na lista.
  period.addEventListener("click", async (event) => {

    // Retorna como TRUE somente se clicar onde esta a classe cancel-icon, ou seja, no ícone de cancelar.
    if (event.target.classList.contains("cancel-icon")){

      // Obtem a li pai do elemento clicado.
      const item = event.target.closest("li");

     if (!item || !item.dataset?.id) return;
     
    // Retorna somente o ID do campo agedamento para poder remover.
    const { id } = item.dataset;

    // Confirma que o ID foi selecionado.
    if (id) {
      // Confirma se o usuário quer cancelar.
      const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento? ")

      if (isConfirm) {
        // Faz a requisições na API para cancelar. 
        await scheduleCancel({ id });

        // Recarrega os agendamentos.
        schedulesDay();
      }
    }
    }
  })
})
