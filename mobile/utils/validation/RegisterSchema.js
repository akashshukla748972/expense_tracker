import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(3, "Name must be at least 3 charactor long.").required('Name is required!'),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 charactor long.").required("Password is required!")
});
