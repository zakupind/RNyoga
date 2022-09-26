interface Props {
  text: string;
  setError: (error: string) => void;
}

const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const onlyLatter = /^[a-zа-яё]+$/i;

export const emailValidator = ({ text, setError }: Props) => {
  let error: string = "";

  if (text.match(emailReg) === null) {
    error = "Некорректный email";
  }
  setError(error);
};

export const nameValidator = ({ text, setError }: Props) => {
  let error: string = "";

  // if (text.length < 2) {
  //   error = "Не короче 2 символов";
  // }

  // if (text.match(onlyLatter) === null) {
  //   error = "Имя может содержать только буквы";
  // }

  setError(error);
};

export const passwordValidator = ({ text, setError }: Props) => {
  let error: string = "";
  if (text.length < 8) {
    error = "Не менее 8 символов";
  }
  setError(error);
};
