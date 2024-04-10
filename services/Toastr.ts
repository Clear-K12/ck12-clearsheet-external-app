import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const ToastrService = {
  success, error, clearwatingQueue
};
function success(message: string) {
  toast.success(message);
};

function error(message: string) {
  toast.error(message, { delay: 500 });
};

function clearwatingQueue() {
  toast.clearWaitingQueue();
}
