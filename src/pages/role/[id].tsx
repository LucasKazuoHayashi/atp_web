import React from "react";
import Head from "next/head";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import MyInput from "../../components/input";
import styles from "./styles.module.css";
import { authService } from "@/services/auth.service";
import { Role } from "@/model/role";
import { roleService } from "@/services/role.service";

export default function RolePage() {
  const router = useRouter();
  const params = useParams();

  const [title, setTitle] = React.useState("Nova Role");

  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState<string | undefined>("");

  React.useEffect(() => {
    const user = authService.getLoggedUser();
    if (!user) router.replace("/login");
  }, []);

  React.useEffect(() => {
    if (params && params.id) {
      if (Number(params.id) > 0) {
        setTitle("Edição de Role");
        setId(Number(params.id));
      }
    }
  }, [params]);

  React.useEffect(() => {
    if (id > 0) {
      roleService
        .get(id)
        .then((role) => {
          setName(role.name);
          setDescription(role.description);
        })
        .catch(treat);
    }
  }, [id]);

  function treat(error: any) {
    if (authService.isUnauthorized(error)) {
      router.replace("/login");
    } else {
      alert(`${name}: ${error.message}`);
    }
  }

  async function save() {
    if (!name || name.trim() === "") {
      alert("Nome é obrigatório");
      return;
    }

    try {
      if (id > 0) {
        // editar um usuário
        let body = { name, description } as Role;
        console.log("name", name);
        await roleService.update(id, body);
        router.back();
      } else {
        // Criar um novo
        await roleService.create({ name, description });
        router.back();
      }
    } catch (error: any) {
      treat(error);
    }
  }

  return (
    <div className={styles.loginPage}>
      <Head>
        <title>Cadastro de Role</title>
      </Head>

      <main className={styles.main}>
        <h2>{title}</h2>

        <div className={styles.inputs}>
          <MyInput
            label="Nome"
            value={name}
            readOnly={id > 0}
            onChange={(event) => setName(event.target.value)}
          />
          <MyInput
            label="Descrição"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <button className={styles.button} onClick={save}>
          Salvar
        </button>
      </main>
    </div>
  );
}
