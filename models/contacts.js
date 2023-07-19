import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("models", "contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

export const getById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
};

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

export default {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
