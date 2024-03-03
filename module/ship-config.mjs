export class ShipConfig {
  /**
   * Display the ship configuration app when the cog button is clicked.
   * @param {Event} event  Triggering click event.
   */
  static onShipConfigClicked(event) {
    event.preventDefault();
    (new ShipsConfig(this.object)).render(true);
  }
}

export class ShipsConfig extends FormApplication {
  constructor(object, options) {
    super(object, options);
    /**
     * Copy of the summoning config flags.
     * @type {object}
     */
    this.config = foundry.utils.deepClone(this.object.getFlag("darkmatter", "config") ?? {});
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["dnd5e", "dark-matter-config"],
      template: "modules/sinantrarion-dark-matter/templates/ship-config.hbs",
      width: 500,
      height: "auto"
    });
  }

  /** @inheritdoc */
  get id() {
    return `${this.object.uuid}.ShipConfig`
  }

  get title() {
    return `Ship Data Config`;
  }

  _retainChanges() {
    const formData = foundry.utils.expandObject(this._getSubmitData());
    formData.actorChanges = Object.entries(formData.actorChanges ?? {}).map(entry => entry[1]);
    foundry.utils.mergeObject(this.config, formData);
  }

  /** @inheritdoc */
  async _updateObject(event, formData) {
    this._retainChanges();
    this.object.setFlag("darkmatter", "config", this.config);
  }
}