export default function FieldError({ error, touched }) {
  if (!error || !touched) {
    return null;
  }

  return (
    <p className="mt-1.5 text-xs font-medium text-rose-500">
      {error}
    </p>
  );
}