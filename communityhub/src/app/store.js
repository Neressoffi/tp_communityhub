import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contactsReducer from '../features/contacts/contactsSlice';
import eventsReducer from '../features/events/eventsSlice';
import messagesReducer from '../features/messages/messagesSlice';
import paymentsReducer from '../features/payments/paymentsSlice';
import skillsReducer from '../features/skills/skillsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contacts: contactsReducer,
    events: eventsReducer,
    messages: messagesReducer,
    payments: paymentsReducer,
    skills: skillsReducer,
  },
});
