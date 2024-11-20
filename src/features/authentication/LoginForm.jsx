import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";


function LoginForm() {
  const [email, setEmail] = useState("gaurav123@gmail.com");
  const [password, setPassword] = useState("1234567890");

  //custom hook our
  const {login, loginLoading} = useLogin()
  function handleSubmit(e) {
    e.preventDefault();
    if(!email || !password) return;
    //customhook
    login({email, password});
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button variation='primary' size="large" disabled={loginLoading}>
          {!loginLoading ? "is Login" : <SpinnerMini/>}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
