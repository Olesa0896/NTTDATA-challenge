export const fonts = {
  primary: `"Poppins", sans-serif`,

};

export const typography = {
  text: {
    xxs: `
      font-size: 0.75rem;
      line-height: 150%;
      font-weight: 400;
    `,
    xs: `
      font-size: 0.875rem;
      line-height: 185%;
      font-weight: 400;
    `,
    sm: `
      font-size: 1rem;
      line-height: 187%;
      font-weight: 400;
    `,
    md: `
      font-size: 1.125rem;
      line-height: 155%;
      font-weight: 400;
    `,
    lg: `
      font-size: 1.25rem;
      line-height: 140%;
      font-weight: 400;
    `,
    xl: `
      font-size: 1.375rem;
      line-height: 127%;
      font-weight: 400;
    `,
    xxl: `
    font-size: 2.5rem;
    line-height: 3.75rem;
    `,

  },
  head: {
    xxs: `
      font-size: 1rem;
      line-height: 187%;
      font-weight: 600;
    `,
    xs: `
      font-size: 1.125rem;
      line-height: 155%;
      font-weight: 600;
    `,
    sm: `
      font-size: 1.25rem;
      line-height: 160%;
      font-weight: 600;
    `,
    md: `
      font-size: 1.5rem;
      line-height: 115%;
      font-weight: 600;
    `,
    lg: `
      font-size: 1.75rem;
      line-height: 160%;
      font-weight: 600;
    `,
    xl: `
    font-size: 3rem;
    line-height: 3rem;
    `,

    xxl: `
    font-size: 2.5rem;
    line-height: 150%;
    font-weight: 600;

    `,
  },
};

for (const size in typography.text) {
  typography.text[size] += `
  font-family: ${fonts.primary};
  `;
}

for (const size in typography.head) {
  typography.head[size] += `
  font-family: ${fonts.primary};
  `;
}
