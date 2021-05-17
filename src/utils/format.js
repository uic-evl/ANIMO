const dateAccessor = (d, field) => {
  return !d[field]
    ? '--'
    : new Date(d[field]).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
}

export {dateAccessor}
