import React$1 from 'react';
import * as zustand_middleware from 'zustand/middleware';
import * as zustand from 'zustand';

type ShellProps = {
    title: string;
    children: React$1.ReactNode;
};
declare function Shell({ title, children }: ShellProps): JSX.Element;

type Store = {
    user: string | null;
    score: number;
    setUser: (user: string | null) => void;
    addScore: (amount: number) => void;
};
declare const useAppShell: zustand.UseBoundStore<Omit<zustand.StoreApi<Store>, "persist"> & {
    persist: {
        setOptions: (options: Partial<zustand_middleware.PersistOptions<Store, Store>>) => void;
        clearStorage: () => void;
        rehydrate: () => void | Promise<void>;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: Store) => void) => () => void;
        onFinishHydration: (fn: (state: Store) => void) => () => void;
        getOptions: () => Partial<zustand_middleware.PersistOptions<Store, Store>>;
    };
}>;

type ButtonProps = {
    color?: "primary" | "secondary";
    style?: React.CSSProperties;
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
declare function Button({ color, style, children, ...props }: ButtonProps): JSX.Element;

export { Button, Shell, useAppShell };
