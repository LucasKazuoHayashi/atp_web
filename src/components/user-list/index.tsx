import { User } from "@/model/user";

import styles from "./styles.module.css";

type Props = {
  users: User[];
  edit?: (id: number) => void;
  remove?: (id: number) => void;
};

export default function UserList({ users, edit, remove }: Props) {
  return (
    <div>
      {users?.map((user) => (
        <div key={user.id} className={styles.lineItem}>
          <span className={styles.nameLabel}>{user.name}</span>
          <span className={styles.usernameLabel}>{user.username}</span>
          <div>
            {edit && (
              <button
                className={styles.editButton}
                onClick={() => edit(user.id!)}
              >
                Alterar
              </button>
            )}
            {remove && (
              <button
                className={styles.delButton}
                onClick={() => remove(user.id!)}
              >
                Remover
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
