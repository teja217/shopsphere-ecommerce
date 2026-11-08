import { isMongoConnected } from '../config/db.js';
import { Contact } from '../models/Contact.js';
import { fallbackStore } from './fallbackStore.js';

export const contactService = {
  async submitContactForm({ name, email, subject, message }) {
    if (!isMongoConnected()) {
      return fallbackStore.addContactMessage({ name, email, subject, message });
    }

    const contact = new Contact({ name, email, subject, message });
    return contact.save();
  },
};
