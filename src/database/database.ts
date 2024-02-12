import { v4 as uuidv4 } from "uuid";

class Database<T extends { id: string }> {
  private data: Array<T> = [];

  async getAll() {
    return this.data;
  }

  async getById(id: string) {
    const item = this.data.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundError();
    }
    return item;
  }

  async create(item: T) {
    const newItem = { ...item, id: uuidv4() };
    this.data.push(newItem);

    return newItem;
  }

  async update(id: string, item: T) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundError();
    }
    const updatedItem = { ...item, id };
    this.data[index] = updatedItem;

    return updatedItem;
  }

  async delete(id: string) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundError();
    }
    const deletedItem = this.data[index];
    this.data.splice(index, 1);

    return deletedItem;
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Item not found");
  }
}

export default new Database();
