import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function Input({ id, label, ...props }: InputProps) {
  return <label className="input-wrap" htmlFor={id}><span className="visually-hidden">{label}</span><span aria-hidden="true">⌕</span><input id={id} {...props} /></label>;
}
