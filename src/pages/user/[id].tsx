import React from "react";
import Head from "next/head";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import MyInput from "../../components/input";
import styles from "./styles.module.css";
import { userService } from "@/services/user.service";
import { authService } from "@/services/auth.service";
import { User } from "@/model/user";
import { roleService } from "@/services/role.service";
import { Role } from "@/model/role";
import ReactSelect from "react-select";
import DropdownMultselect from "@/components/dropdownMultselect";

export default function UserPage() {
  const router = useRouter();
  const params = useParams();

  const [title, setTitle] = React.useState("Novo Usuário");

  //user
  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passConfirm, setPassConfirm] = React.useState("");

  //roles
  const [roles, setRoles] = React.useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);

  React.useEffect(() => {
    roleService
      .getList()
      .then((list) => setRoles(list))
      .catch(treat);
  }, []);

  React.useEffect(() => {
    const user = authService.getLoggedUser();
    if (!user) router.replace("/login");
  }, []);

  React.useEffect(() => {
    if (params && params.id) {
      if (Number(params.id) > 0) {
        setTitle("Edição de Usuário");
        setId(Number(params.id));
      }
    }
  }, [params]);

  React.useEffect(() => {
    if (id > 0) {
      userService
        .get(id)
        .then((user) => {
          setName(user.name);
          setUsername(user.username);
          setSelectedRoles(user.roles);
        })
        .catch(treat);
    }
  }, [id]);

  function treat(error: any) {
    if (authService.isUnauthorized(error)) {
      router.replace("/login");
    } else {
      alert(`${username}: ${error.message}`);
    }
  }

  async function save() {
    if (!name || name.trim() === "") {
      alert("Nome é obrigatório");
      return;
    }

    if (id === 0 || password.trim() !== "") {
      if (!password || password.trim() === "") {
        alert("Senha é obrigatória");
        return;
      }
      if (password !== passConfirm) {
        alert("A Senha não confere");
        return;
      }
    }

    try {
      if (id > 0) {
        // editar um usuário
        let body = { name, username, roles: selectedRoles } as User;
        console.log("body", body);
        if (password && password.trim() !== "") {
          body = { ...body, password };
        }
        await userService.update(id, body);
        router.back();
      } else {
        // Criar um novo
        if (!username || username.trim() === "") {
          alert("Login é obrigatório");
          return;
        }

        await userService.create({
          name,
          username,
          password,
          roles: selectedRoles,
        });
        router.back();
      }
    } catch (error: any) {
      treat(error);
    }
  }

  return (
    <div className={styles.loginPage}>
      <Head>
        {" "}
        <title>Cadastro de Usuário</title>{" "}
      </Head>

      <main className={styles.main}>
        <h2>{title}</h2>

        <div className={styles.inputs}>
          <MyInput
            label="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <MyInput
            label="Login"
            value={username}
            readOnly={id > 0}
            onChange={(event) => setUsername(event.target.value)}
          />
          <MyInput
            label="Senha"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <MyInput
            label="Confirmar Senha"
            type="password"
            onChange={(event) => setPassConfirm(event.target.value)}
          />
          <DropdownMultselect
            label="Roles"
            options={roles.map((role) => ({ id: role.id, name: role.name }))}
            selectedOptions={selectedRoles}
            setSelectedOptions={setSelectedRoles}
          />
        </div>

        <button className={styles.button} onClick={save}>
          Salvar
        </button>
      </main>
    </div>
  );
}
