const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(({ id }) => id === String(contactId)) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === String(contactId));
  if (index === -1) return null;
  const [deleteContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deleteContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const id = nanoid();
  contacts.push({ id, name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return { id, name, email, phone };
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  contacts[index] = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
