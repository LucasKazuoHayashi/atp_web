import React from "react";
import Head from "next/head";

import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { roleService } from "@/services/role.service";
import { authService } from "@/services/auth.service";
import ButtonExit from "@/components/button-exit";
import { Role } from "@/model/role";
import RoleList from "@/components/role-list";

export default function ListagemRolePage() {
  const router = useRouter();

  const [roles, setRoles] = React.useState<Role[]>([]);

  React.useEffect(fetchRoles, []);

  function goToUser() {
    router.push("home");
  }

  function goToAddRole() {
    router.push("/role/0");
  }

  function treat(error: any) {
    if (authService.isUnauthorized(error)) {
      router.replace("login");
    } else {
      alert(error.message);
    }
  }

  function fetchRoles() {
    roleService
      .getList()
      .then((list) => setRoles(list))
      .catch(treat);
  }

  function edit(id: number) {
    router.push(`/role/${id}`);
  }

  function remove(id: number) {
    roleService
      .remove(id)
      .then((removed) => fetchRoles())
      .catch(treat);
  }

  return (
    <>
      <Head>
        <title>Role Page</title>
      </Head>
      <main>
        <div className={styles.homeHeader}>
          <ButtonExit />

          <h3>Listagem de Roles</h3>

          <div>
            <button onClick={goToUser} className={styles.buttonUser}>
              Users
            </button>
            <button onClick={goToAddRole}>Add</button>
          </div>
        </div>

        <div className={styles.homeMain}>
          <RoleList roles={roles} edit={edit} remove={remove} />
        </div>
      </main>
    </>
  );
}
