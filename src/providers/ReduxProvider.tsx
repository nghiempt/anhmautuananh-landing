"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import { setAvatar } from "@/store/userSlice";

function PersistUserAvatar() {
  useEffect(() => {
    try {
      const savedAvatar = localStorage.getItem("user.avatar");
      if (savedAvatar) {
        store.dispatch(setAvatar(savedAvatar));
      }
    } catch {}

    const unsubscribe = store.subscribe(() => {
      const state = store.getState() as any;
      const avatar = state?.user?.avatar ?? null;
      try {
        if (avatar) {
          localStorage.setItem("user.avatar", avatar);
        } else {
          localStorage.removeItem("user.avatar");
        }
      } catch {}
    });
    return unsubscribe;
  }, []);

  return null;
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistUserAvatar />
      {children}
    </Provider>
  );
}
