const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    return words.length > 1
      ? (words[0][0] + words[1][0]).toUpperCase()
      : (words[0][0] + words[0][words[0].length - 1]).toUpperCase();
};
export default getInitials;