import { useForm } from "react-hook-form";
import validator from "validator"

function GoodForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && <p className="error-message">Name is required</p>}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", { required: true, validate: (value) => validator.isEmail(value) })}
        />
        {errors?.email?.type === "required" && <p className="error-message">Email is required</p>}
        {errors?.email?.type === "validate" && <p className="error-message">Email invalid</p>}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register("password", { minLength: 7, required: true })}
        />
        {errors?.password?.type === "minLength" && (
          <p className="error-message">Password must have at least 7 characters</p>
        )}
        {errors?.password?.type === "required" && (
          <p className="error-message">Password is required</p>
        )}
      </div>

      <div className="form-group">
        <label>Profissão</label>
        <select
          {...register("profession", {
            validate: (value) => {
              return value !== "0";
            }
          })}
          className={errors?.profession && "input-error"}
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>

        {errors?.profession?.type === "validate" && (<p className="error-message">Profession is required</p>)}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register("privacyTerms", { required: true })}
          />
          <label>I agree with the privacy terms.</label>
        </div>

        {errors?.privacyTerms?.type === "required" && (<p className="error-message">You must agree a privacyTerms</p>)}
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default GoodForm;
