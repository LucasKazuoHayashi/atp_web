import { Role } from "@/model/role";
import { authService } from "./auth.service";

class RoleService {
  private readonly url = "http://localhost:3030/roles";

  private getHeaders() {
    const logged = authService.getLoggedUser();
    if (!logged) throw new Error("Unauthorized");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${logged.token}`,
    };
  }

  private async validate(response: Response) {
    const data = await response.json();

    if (response.status === 401) {
      throw new Error(response.statusText);
    } else if (response.status > 299) {
      throw new Error(data.message);
    }
    return data;
  }

  public async create(user: Role) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(user),
    });

    const data = await this.validate(response);
    return data as Role;
  }

  public async getList() {
    const response = await fetch(this.url, {
      method: "GET",
      headers: this.getHeaders(),
    });

    const data = await this.validate(response);
    return data as Role[];
  }

  public async get(id: number) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    const data = await this.validate(response);
    return data as Role;
  }

  public async update(id: number, user: Role) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(user),
    });

    const data = await this.validate(response);
    return data as Role;
  }

  public async remove(id: number) {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    const data = await this.validate(response);
    return data as boolean;
  }
}

export const roleService = new RoleService();
