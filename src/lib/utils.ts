export function slugify(input: string) {
  if (!input) return '';
  let slug = input.toLowerCase().trim();
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();
  slug = slug.replace(/[\s-]+/g, '-');
  return slug;
}

export function unique(array: any[], identifier?: string | number) {
  return array.filter((a, index) =>
    identifier
      ? index === array.findIndex((b) => a[identifier] === b[identifier])
      : index === array.indexOf(a),
  );
}
