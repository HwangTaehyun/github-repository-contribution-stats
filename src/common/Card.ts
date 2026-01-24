import { encodeHTML, flexLayout, getCardColors } from '@/common/utils';
import { getAnimations } from '@/getStyles';

export class Card {
  width: number;
  height: number;
  hideBorder: boolean;
  hideTitle: boolean;
  hideContributorRank: boolean;
  border_radius: number;
  colors: Partial<ReturnType<typeof getCardColors>>;
  title: string;
  repositoryNameTitle: string;
  css: string;
  paddingX: number;
  paddingY: number;
  titlePrefixIcon: string;
  animations: boolean;
  a11yTitle: string;
  a11yDesc: string;
  /**
   * @param {object} args
   * @param {number?=} args.width
   * @param {number?=} args.height
   * @param {number?=} args.border_radius
   * @param {string?=} args.customTitle
   * @param {string?=} args.defaultTitle
   * @param {string?=} args.titlePrefixIcon
   * @param {ReturnType<import('../common/utils').getCardColors>?=} args.colors
   */
  constructor({
    width = 100,
    height = 100,
    border_radius = 4.5,
    colors = {},
    customTitle,
    defaultTitle = '',
    titlePrefixIcon = '',
  }) {
    this.width = width;
    this.height = height;

    this.hideBorder = false;
    this.hideTitle = false;
    this.hideContributorRank = false;

    this.border_radius = border_radius;

    // returns theme based colors with proper overrides and defaults
    this.colors = colors;
    this.title =
      customTitle !== undefined ? encodeHTML(customTitle) : encodeHTML(defaultTitle);
    this.repositoryNameTitle = 'Repository';

    this.css = '';

    this.paddingX = 25;
    this.paddingY = 35;
    this.titlePrefixIcon = titlePrefixIcon;
    this.animations = true;
    this.a11yTitle = '';
    this.a11yDesc = '';
  }

  disableAnimations() {
    this.animations = false;
  }

  /**
   * @param {{title: string, desc: string}} prop
   */
  setAccessibilityLabel({ title, desc }) {
    this.a11yTitle = title;
    this.a11yDesc = desc;
  }

  /**
   * @param {string} value
   */
  setCSS(value) {
    this.css = value;
  }

  /**
   * @param {boolean} value
   */
  setHideBorder(value) {
    this.hideBorder = value;
  }

  /**
   * @param {boolean} value
   */
  setHideTitle(value) {
    this.hideTitle = value;
    if (value) {
      this.height -= 30;
    }
  }

  /**
   * @param {boolean} value
   */
  setHideContributorRank(value) {
    this.hideContributorRank = value;
  }

  /**
   * @param {string} text
   */
  setTitle(text) {
    this.title = text;
  }

  renderTitle() {
    const titleText = `
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >${this.title}</text>
    `;

    const prefixIcon = `
      <svg
        class="icon"
        x="0"
        y="-13"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
      >
        ${this.titlePrefixIcon}
      </svg>
    `;
    return `
      <g
        data-testid="card-title"
        transform="translate(${this.paddingX}, ${this.paddingY})"
      >
        ${flexLayout({
          items: [this.titlePrefixIcon && prefixIcon, titleText],
          gap: 25,
          direction: 'row',
        }).join('')}
      </g>
    `;
  }

  renderSubTitle() {
    const repoTitleText = `
    <text
      x="0"
      y="5"
      class="sub-title-header"
      data-testid="header"
    >${this.repositoryNameTitle}</text>
  `;

    const gitPRIcon = `
    <svg
      class="icon"
      x="0"
      y="-13"
      viewBox="0 0 24 24 "
      version="1.1"
      width="24"
      height="24"
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7071 2.70711L13.4142 4H14C17.3137 4 20 6.68629 20 10V16.1707C21.1652 16.5825 22 17.6938 22 19C22 20.6569 20.6569 22 19 22C17.3431 22 16 20.6569 16 19C16 17.6938 16.8348 16.5825 18 16.1707V10C18 7.79086 16.2091 6 14 6H13.4142L14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711C14.3166 9.09763 13.6834 9.09763 13.2929 8.70711L10.2929 5.70711C9.90237 5.31658 9.90237 4.68342 10.2929 4.29289L13.2929 1.29289C13.6834 0.902369 14.3166 0.902369 14.7071 1.29289C15.0976 1.68342 15.0976 2.31658 14.7071 2.70711ZM18 19C18 18.4477 18.4477 18 19 18C19.5523 18 20 18.4477 20 19C20 19.5523 19.5523 20 19 20C18.4477 20 18 19.5523 18 19ZM6 4C5.44772 4 5 4.44772 5 5C5 5.55228 5.44772 6 6 6C6.55228 6 7 5.55228 7 5C7 4.44772 6.55228 4 6 4ZM7 7.82929C8.16519 7.41746 9 6.30622 9 5C9 3.34315 7.65685 2 6 2C4.34315 2 3 3.34315 3 5C3 6.30622 3.83481 7.41746 5 7.82929V16.1707C3.83481 16.5825 3 17.6938 3 19C3 20.6569 4.34315 22 6 22C7.65685 22 9 20.6569 9 19C9 17.6938 8.16519 16.5825 7 16.1707V7.82929ZM6 18C5.44772 18 5 18.4477 5 19C5 19.5523 5.44772 20 6 20C6.55228 20 7 19.5523 7 19C7 18.4477 6.55228 18 6 18Z"/>
    </svg>
  `;

    const starIcon = `
    <svg
      class="icon"
      x="0"
      y="-13"
      viewBox="0 0 24 24 "
      version="1.1"
      width="24"
      height="24"
    >
      <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;

    const githubIcon = `
    <svg
      class="icon"
      x="0"
      y="-13"
      viewBox="0 0 24 24"
      version="1.1"
      width="24"
      height="24"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path fill-rule="evenodd" d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm3.163 21.783h-.093a.513.513 0 0 1-.382-.14.513.513 0 0 1-.14-.372v-1.406c.006-.467.01-.94.01-1.416a3.693 3.693 0 0 0-.151-1.028 1.832 1.832 0 0 0-.542-.875 8.014 8.014 0 0 0 2.038-.471 4.051 4.051 0 0 0 1.466-.964c.407-.427.71-.943.885-1.506a6.77 6.77 0 0 0 .3-2.13 4.138 4.138 0 0 0-.26-1.476 3.892 3.892 0 0 0-.795-1.284 2.81 2.81 0 0 0 .162-.582c.033-.2.05-.402.05-.604 0-.26-.03-.52-.09-.773a5.309 5.309 0 0 0-.221-.763.293.293 0 0 0-.111-.02h-.11c-.23.002-.456.04-.674.111a5.34 5.34 0 0 0-.703.26 6.503 6.503 0 0 0-.661.343c-.215.127-.405.249-.573.362a9.578 9.578 0 0 0-5.143 0 13.507 13.507 0 0 0-.572-.362 6.022 6.022 0 0 0-.672-.342 4.516 4.516 0 0 0-.705-.261 2.203 2.203 0 0 0-.662-.111h-.11a.29.29 0 0 0-.11.02 5.844 5.844 0 0 0-.23.763c-.054.254-.08.513-.081.773 0 .202.017.404.051.604.033.199.086.394.16.582A3.888 3.888 0 0 0 5.702 10a4.142 4.142 0 0 0-.263 1.476 6.871 6.871 0 0 0 .292 2.12c.181.563.483 1.08.884 1.516.415.422.915.75 1.466.964.653.25 1.337.41 2.033.476a1.828 1.828 0 0 0-.452.633 2.99 2.99 0 0 0-.2.744 2.754 2.754 0 0 1-1.175.27 1.788 1.788 0 0 1-1.065-.3 2.904 2.904 0 0 1-.752-.824 3.1 3.1 0 0 0-.292-.382 2.693 2.693 0 0 0-.372-.343 1.841 1.841 0 0 0-.432-.24 1.2 1.2 0 0 0-.481-.101c-.04.001-.08.005-.12.01a.649.649 0 0 0-.162.02.408.408 0 0 0-.13.06.116.116 0 0 0-.06.1.33.33 0 0 0 .14.242c.093.074.17.131.232.171l.03.021c.133.103.261.214.382.333.112.098.213.209.3.33.09.119.168.246.231.381.073.134.15.288.231.463.188.474.522.875.954 1.145.453.243.961.364 1.476.351.174 0 .349-.01.522-.03.172-.028.343-.057.515-.091v1.743a.5.5 0 0 1-.533.521h-.062a10.286 10.286 0 1 1 6.324 0v.005z">
        </path>
      </g>
    </svg>`;

    return `
      <g
        data-testid="card-title"
        transform="translate(${this.paddingX}, ${this.paddingY + 30})"
      >
        ${flexLayout({
          items: [githubIcon, repoTitleText],
          gap: 30,
          direction: 'row',
        }).join('')}
      </g>
      <g
        data-testid="card-title"
        transform="translate(${this.paddingX + 235}, ${this.paddingY + 30})"
      >
        ${flexLayout({
          items: [!this.hideContributorRank && gitPRIcon, starIcon],
          gap: 50,
          direction: 'row',
        }).join('')}
      </g>
    `;
  }

  renderGradient() {
    if (typeof this.colors.bgColor !== 'object') return '';

    const gradients = this.colors.bgColor.slice(1);
    return typeof this.colors.bgColor === 'object'
      ? `
        <defs>
          <linearGradient
            id="gradient"
            gradientTransform="rotate(${this.colors.bgColor[0]})"
            gradientUnits="userSpaceOnUse"
          >
            ${gradients.map((grad, index) => {
              const offset = (index * 100) / (gradients.length - 1);
              return `<stop offset="${offset}%" stop-color="#${grad}" />`;
            })}
          </linearGradient>
        </defs>
        `
      : '';
  }

  /**
   * @param {string} body
   */
  render(body) {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="img"
        aria-labelledby="descId"
      >
        <a xlink:href="https://github.com/HwangTaehyun/github-contributor-stats" 
        xlink:title="github-contributor-stats(new tab)"
        target="_blank">
          <title id="titleId">${this.a11yTitle}</title>
          <desc id="descId">${this.a11yDesc}</desc>
          <style>
            .header {
              font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
              fill: ${this.colors?.titleColor};
              animation: fadeInAnimation 0.8s ease-in-out forwards;
            }
            .sub-title-header {
              font: 800 14px 'Segoe UI', Ubuntu, Sans-Serif;
              fill: ${this.colors?.titleColor};
              animation: fadeInAnimation 0.8s ease-in-out forwards;
            }
            @supports(-moz-appearance: auto) {
              /* Selector detects Firefox */
              .header { font-size: 15.5px; }
            }
            ${this.css}

            ${process.env.NODE_ENV === 'test' ? '' : getAnimations()}
            ${
              this.animations === false
                ? `* { animation-duration: 0s !important; animation-delay: 0s !important; }`
                : ''
            }
          </style>

          ${this.renderGradient()}

          <rect
            data-testid="card-bg"
            x="0.5"
            y="0.5"
            rx="${this.border_radius}"
            height="99%"
            stroke="${this.colors.borderColor}"
            width="${this.width - 1}"
            fill="${
              typeof this.colors.bgColor === 'object'
                ? 'url(#gradient)'
                : this.colors.bgColor
            }"
            stroke-opacity="${this.hideBorder ? 0 : 1}"
          />
          ${this.hideTitle ? '' : this.renderTitle()}
          ${this.hideTitle ? '' : this.renderSubTitle()}
          <g
            data-testid="main-card-body"
            transform="translate(0, ${
              this.hideTitle ? this.paddingX : this.paddingY + 20 + 30
            })"
          >
            ${body}
          </g>
        </a>
      </svg>
    `;
  }
}
