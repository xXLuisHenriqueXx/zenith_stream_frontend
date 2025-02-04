import { useState } from "react";
import { tv } from "tailwind-variants";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Eye, EyeOff, Key, Lock, Mail } from "lucide-react";

import { adminService } from "../../../services/adminService";
import { adminLoginSchema } from "../../../schemas/adminSchemas";
import Container from "../../../components/Container";

const card = tv({
  slots: {
    containerLogin:"flex flex-col justify-center items-center w-full md:w-3/5 lg:w-1/2 xl:w-2/5 h-full",
    title: "text-3xl font-inter text-center font-black text-white uppercase",
    description: "mb-8 text-md text-center font-inter text-slate-400",
    form: "flex flex-col justify-center items-center w-full",
    labelInput: "flex flex-row items-center w-full h-12 px-4 mb-4 bg-gray-800 text-white rounded-sm",
    icon: "w-6 h-6 text-white",
    input: "w-full h-full bg-transparent text-white ml-2 focus:outline-none",
    button: "relative flex justify-center items-center w-full h-12 px-4 bg-transparent hover:bg-blue-500 border-2 border-blue-500 rounded-sm text-white hover:text-slate-900 transition-all duration-200",
    buttonText: "text-lg font-bold",
    buttonIcon: "w-6 h-6 absolute right-4",
  },
});

const { containerLogin, title, description, form, labelInput, icon, input, button, buttonText, buttonIcon } = card();

type AdminLoginData = z.infer<typeof adminLoginSchema>;

function AdminLogin() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigation = useNavigate();

  const { register, handleSubmit } = useForm<AdminLoginData>({
    resolver: zodResolver(adminLoginSchema),
  });

  const typeInputPassword = showPassword ? "text" : "password";
  
  const navigateToDashboard = () => {
    navigation("/admin/dashboard");
  };

  const onSubmit: SubmitHandler<AdminLoginData> = async (
    data: AdminLoginData
  ) => {
    try {
      const { status } = await adminService.login(data);

      if (status == 401) {
        alert("Usuário ou senha inválidos");
      } else if (status === 200) {
        alert("Usuário logado com sucesso");

        navigateToDashboard();
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Container screen="login">
      <section className={containerLogin()}>
        <h1 className={title()}>Bem vindo(a) de volta!</h1>
        <p className={description()}>
          Realize o login para acessar as funcionalidades.
        </p>

        <form className={form()} onSubmit={handleSubmit(onSubmit)}>
          <label className={labelInput()}>
            <Mail className={icon()} />
            <input
              type="text"
              placeholder="Email"
              autoComplete="off"
              className={input()}
              {...register("email")}
            />
            {/* {errors.username && <p>{errors.username.message}</p>} */}
          </label>

          <label className={labelInput()}>
            <Lock className={icon()} />
            <input
              type={typeInputPassword}
              placeholder="Senha"
              autoComplete="off"
              className={input()}
              {...register("password")}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <EyeOff className={icon()} />
              ) : (
                <Eye className={icon()} />
              )}
            </button>
            {/* {errors.password && <p>{errors.password.message}</p>} */}
          </label>

          <label className={labelInput()}>
            <Key className={icon()} />
            <input
              type="text"
              placeholder="Chave de acesso"
              autoComplete="off"
              className={input()}
              {...register("accessKey")}
            />
            {/* {errors.username && <p>{errors.username.message}</p>} */}
          </label>

          <button type="submit" className={button()}>
            <h2 className={buttonText()}>Login</h2>
            <ArrowRight className={buttonIcon()} />
          </button>
        </form>
      </section>
    </Container>
  );
}

export default AdminLogin;
