function toCamelCase(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase);
  }

  if (obj !== null && typeof obj === "object") {
    const camelCaseObj: Record<string, unknown> = {};
    Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      camelCaseObj[camelKey] = toCamelCase(value);
    });
    return camelCaseObj;
  }

  return obj;
}

export default toCamelCase;

