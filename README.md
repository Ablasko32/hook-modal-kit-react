# **Hook-modal-kit-react**

**One context provider and one hook.That's it!**

---

`hook-modal-kit-react` is a simple, customizable modal library for React that uses a context provider and a hook for handling modal state. It is designed to make it easy to add modals to your React applications with minimal configuration.

## 🚀 **Features**

**✅ Simple API**: Use the `ModalProvider` to wrap your app and the `useModal` hook to open and close modals.

**🎨 Customizable**: Style the modal as you see fit.

**⚡ Small and Lightweight**: Minimal dependency and easy to integrate into any project.

## 📦 **Installation**

You can install the package using NPM or Yarn.

#### NPM

```bash
npm install hook-modal-kit-react
```

## ⚙️ **Usage**

**1.** Wrap your app with `ModalProvider`
In your main component (e.g., App.tsx), to provide modal functionality throughout the app.

> Don't forget to import default styles!

```tsx
import { ModalProvider } from "hook-modal-kit-react";
import "hook-modal-kit-react/styles.css"; //import styles

function App() {
  return (
    <ModalProvider>
      <YourApp />
    </ModalProvider>
  );
}

export default App;
```

**2.** Use the `useModal` hook to control the modal.
The hook exposes several utility functions.

- `openModal`
- `showConfirm`
- `showInfo`
- `closeModal`

```tsx
import { useModal } from "hook-modal-kit-react";

const { openModal, showConfirm, showInfo, closeModal } = useModal();
```

| Hook                                      | Use case                          |
| :---------------------------------------- | :-------------------------------- |
| openModal(content)                        | Opens a modal with any React node |
| closeModal()                              | Closes the currently open modal   |
| showConfirm(message, onConfirm, options?) | Opens a confirmation modal        |
| showInfo(message, options?)               | Opens an info modal               |

## 🛠️ **API Reference**

### **Provider**

The `ModalProvider` component wraps your application and enables modal functionality throughout your entire app.

```tsx
import { ModalProvider } from "hook-modal-kit-react";
import "hook-modal-kit-react/styles.css"; //import styles

function App() {
  return (
    <ModalProvider>
      <YourApp />
    </ModalProvider>
  );
}
```

- Provides access to useModal hook to whole app
- You can pass global styling and behavior options to the provider:

```tsx
export interface ModalOptions {
  theme?: "light" | "dark";
  defaultPadding?: boolean;
  bgClassName?: string;
  modalClassName?: string;
  closeClassName?: string;
  actionClassName?: string;
  customCloseIcon?: React.ReactNode;
}
```

### **Hooks**

##### `openModal`

Opens a modal with custom content.

```tsx
<button onClick={() => openModal(<MyForm />)}>Open modal</button>
```

- Accepts any valid React node (<MyComponent />, JSX, text, etc.)

- Use closeModal inside the content to manually close the modal.

##### `closeModal`

```tsx
<button onClick={closeModal}>Close modal</button>
```

- Use this in custom modals, buttons, or programmatically.

##### `showConfirm`

```tsx
<button onClick={() => showConfirm("Are you sure?", onConfirm)}>
  Confirm modal
</button>
```

- Displays a confirmation dialog with "Confirm" and "Cancel" buttons.
- Accepts optional options object with customization options

```tsx
  confirmText?: string;
  closeText?: string;
  modalClassName?: string;
  messageClassName?: string;
  buttonsClassName?: string;
  primaryBtnClassName?: string;
  closeBtnClassName?: string;
```

##### `showInfo`

```tsx
<button onClick={() => showInfo("This is notification text!")}>
  Info modal
</button>
```

- Displays an informational dialog with a dismiss button.
- Accepts optional options object with customization options

```tsx
  messageClassName?: string;
  dismissClassName?: string;
  modalClassName?: string;
  actionText?: string;
```

With `ModalProvider` and `useModal`, you can build highly flexible modal experiences with clean and simple code.

## 📄 **License**

This library is licensed under the **MIT License**.

## **Author**

Created by **Antonio Blašković**
