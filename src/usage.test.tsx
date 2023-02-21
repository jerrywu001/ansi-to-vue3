/* eslint-disable max-len */
import { shallowMount } from '@vue/test-utils';
import { expect } from 'vitest';
import { render } from '@testing-library/vue';
import Ansi from '.';

const GREEN_FG = '\u001b[32m';
const YELLOW_BG = '\u001b[43m';
const BOLD = '\u001b[1m';
const RESET = '\u001b[0;m';

function resolveHtml(str = '') {
  return str.replace(/ class=""/g, '').replace(/: rgb/g, ':rgb').replace(/;"/g, '"')
    .replace(/; /g, ';');
}

describe('Ansi', () => {
  test('can distinguish URL-ish text', () => {
    const dom = render(<Ansi linkify>{'<transport.model.TransportInfo'}</Ansi>);
    expect(dom).not.toBeNull();
    expect(dom.getByText('<transport.model.TransportInfo').innerHTML).not.toBeUndefined();
  });

  test('can distinguish URL-ish text', () => {
    const el = render(<Ansi linkify>{"<module 'something' from '/usr/local/lib/python2.7/dist-packages/something/__init__.pyc'>"}</Ansi>);
    expect(el).not.toBeNull();
    expect(el.getByText("<module 'something' from '/usr/local/lib/python2.7/dist-packages/something/__init__.pyc'>").innerHTML).not.toBeUndefined();
  });

  test('hello world', () => {
    const wrapper = shallowMount(Ansi, {
      slots: {
        default: 'hello world',
      },
    });
    expect(wrapper).not.toBeNull();
    expect(wrapper.text()).toBe('hello world');
  });

  test('can color', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: `hello ${GREEN_FG}world`,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('hello world');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>hello </span><span style="color:rgb(0, 187, 0)">world</span></code>',
    );
  });

  test('can have className', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: 'hello world',
      },
      attrs: {
        class: 'my-class',
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('hello world');
    expect(resolveHtml(el.html())).toBe(
      '<code class="my-class"><span>hello world</span></code>',
    );
  });

  test('can nest', () => {
    const el = shallowMount(
      Ansi,
      {
        slots: {
          default: `hello ${GREEN_FG}wo${YELLOW_BG}rl${RESET}d`,
        },
      },
    );
    expect(el).not.toBeNull();
    expect(el.text()).toBe('hello world');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>hello </span><span style="color:rgb(0, 187, 0)">wo</span><span style="background-color:rgb(187, 187, 0);color:rgb(0, 187, 0)">rl</span><span>d</span></code>',
    );
  });

  test('can handle backspace symbol', () => {
    const el = shallowMount(
      Ansi,
      {
        slots: {
          default: '01hello\b goodbye',
        },
      },
    );
    expect(el).not.toBeNull();
    expect(el.text()).toBe('01hell goodbye');
  });

  test('handles backspace symbol in same funny way as Jupyter Classic -- 1/2', () => {
    const el = shallowMount(
      Ansi,
      {
        slots: {
          default: '02hello\b\b goodbye',
        },
      },
    );
    expect(el).not.toBeNull();
    expect(el.text()).toBe('02hel goodbye');
  });

  test('handles backspace symbol in same funny way as Jupyter Classic -- 2/2', () => {
    const el = shallowMount(
      Ansi,
      {
        slots: {
          default: '03hello\b\b\b goodbye',
        },
      },
    );
    expect(el).not.toBeNull();
    expect(el.text()).toBe('03hell goodbye');
  });

  test('can linkify', () => {
    const el = shallowMount(
      Ansi,
      {
        slots: {
          default: 'this is a link: https://nteract.io/',
        },
        props: {
          linkify: true,
        },
      },
    );
    expect(el).not.toBeNull();
    expect(el.text()).toBe('this is a link: https://nteract.io/');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>this is a link: <a href="https://nteract.io/" target="_blank">https://nteract.io/</a></span></code>',
    );
  });

  test('can linkify links starting with www.', () => {
    const el = shallowMount(
      Ansi,
      {
        slots: {
          default: 'this is a link: www.google.com',
        },
        props: {
          linkify: true,
        },
      },
    );
    expect(el).not.toBeNull();
    expect(el.text()).toBe('this is a link: www.google.com');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>this is a link: <a href="http://www.google.com" target="_blank">www.google.com</a></span></code>',
    );
  });

  test("doesn't linkify partial matches", () => {
    const el = shallowMount(
      Ansi,
      {
        slots: {
          default: "can't click this link: 'http://www.google.com'",
        },
        props: {
          linkify: true,
        },
      },
    );
    expect(el).not.toBeNull();
    expect(el.text()).toBe("can\'t click this link: 'http://www.google.com'");
    expect(resolveHtml(el.html())).toBe(
      '<code><span>can\'t click this link: \'http://www.google.com\'</span></code>',
    );
  });

  test('can linkify multiple links', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: 'this is a link: www.google.com and this is a second link: www.microsoft.com',
      },
      props: {
        linkify: true,
      },
    });

    expect(el).not.toBeNull();
    expect(el.text()).toBe('this is a link: www.google.com and this is a second link: www.microsoft.com');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>this is a link: <a href=\"http://www.google.com\" target=\"_blank\">www.google.com</a> and this is a second link: <a href=\"http://www.microsoft.com\" target=\"_blank\">www.microsoft.com</a></span></code>',
    );
  });

  test('creates a minimal number of nodes when using linkify', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: 'this is a link: www.google.com and this is text after',
      },
      props: {
        linkify: true,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('this is a link: www.google.com and this is text after');
    expect(el.element.firstChild?.childNodes).toHaveLength(3);
  });

  test('can linkify multiple links one after another', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: 'www.google.com www.google.com www.google.com',
      },
      props: {
        linkify: true,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('www.google.com www.google.com www.google.com');
    expect(resolveHtml(el.html())).toBe(
      '<code><span><a href="http://www.google.com" target="_blank">www.google.com</a> <a href="http://www.google.com" target="_blank">www.google.com</a> <a href="http://www.google.com" target="_blank">www.google.com</a></span></code>',
    );
  });

  test('can handle URLs inside query parameters', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: 'www.google.com/?q=https://www.google.com',
      },
      props: {
        linkify: true,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('www.google.com/?q=https://www.google.com');
    expect(resolveHtml(el.html())).toBe(
      '<code><span><a href="http://www.google.com/?q=https://www.google.com" target="_blank">www.google.com/?q=https://www.google.com</a></span></code>',
    );
  });
});

describe('useClasses options', () => {
  test('can add the font color class', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: `hello ${GREEN_FG}world`,
      },
      props: {
        useClasses: true,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('hello world');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>hello </span><span class="ansi-green-fg">world</span></code>',
    );
  });

  test('can add the background color class', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: `hello ${YELLOW_BG}world`,
      },
      props: {
        useClasses: true,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('hello world');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>hello </span><span class="ansi-yellow-bg">world</span></code>',
    );
  });

  test('can add font and background color classes', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: `hello ${GREEN_FG}${YELLOW_BG}world`,
      },
      props: {
        useClasses: true,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('hello world');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>hello </span><span class="ansi-yellow-bg ansi-green-fg">world</span></code>',
    );
  });

  test('can add text decoration classes', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: `hello ${GREEN_FG}${BOLD}world${RESET}!`,
      },
      props: {
        useClasses: true,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('hello world!');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>hello </span><span class="ansi-green-fg ansi-bold">world</span><span>!</span></code>',
    );
  });

  test('can use useClasses with linkify', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: `${GREEN_FG}this is a link: https://nteract.io/`,
      },
      props: {
        linkify: true,
        useClasses: true,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('this is a link: https://nteract.io/');
    expect(resolveHtml(el.html())).toBe(
      '<code><span class="ansi-green-fg">this is a link: <a href="https://nteract.io/" target="_blank">https://nteract.io/</a></span></code>',
    );
  });

  test('can add text decoration styles', () => {
    const el = shallowMount(Ansi, {
      slots: {
        default: `hello ${GREEN_FG}${BOLD}world${RESET}!`,
      },
    });
    expect(el).not.toBeNull();
    expect(el.text()).toBe('hello world!');
    expect(resolveHtml(el.html())).toBe(
      '<code><span>hello </span><span style="color:rgb(0, 187, 0);font-weight: bold">world</span><span>!</span></code>',
    );
  });
});
