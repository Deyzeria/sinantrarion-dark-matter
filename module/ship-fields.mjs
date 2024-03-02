import { positionObject } from "./setup-weapon.mjs";

export function SetupSizes() {
  CONFIG.DND5E.actorSizes['fighter'] = {
    label: "🚀Fighter",
    abbreviation: "fr",
    token: 0.3,
    capacityMultiplier: 1
  };
  CONFIG.DND5E.actorSizes['personal'] = {
    label: "🚀Personal",
    abbreviation: "pl",
    token: 0.5,
    capacityMultiplier: 1
  };
  CONFIG.DND5E.actorSizes['transport'] = {
    label: "🚀Transport",
    abbreviation: "tr",
    token: 1,
    capacityMultiplier: 1
  };
  CONFIG.DND5E.actorSizes['corvette'] = {
    label: "🚀Corvette",
    abbreviation: "ce",
    token: 2,
    capacityMultiplier: 1
  };
  CONFIG.DND5E.actorSizes['frigate'] = {
    label: "🚀Frigate",
    abbreviation: "fe",
    token: 3,
    capacityMultiplier: 1
  };
  CONFIG.DND5E.actorSizes['lightcruiser'] = {
    label: "🚀Light Cruiser",
    abbreviation: "lc",
    token: 4,
    capacityMultiplier: 1
  };
  CONFIG.DND5E.actorSizes['heavycruiser'] = {
    label: "🚀Heavy Cruiser",
    abbreviation: "hc",
    token: 5,
    capacityMultiplier: 1
  };
  CONFIG.DND5E.actorSizes['capital'] = {
    label: "🚀Capital",
    abbreviation: "cl",
    token: 8,
    capacityMultiplier: 1
  };
  CONFIG.DND5E.actorSizes['titan'] = {
    label: "🚀Titan",
    abbreviation: "tn",
    token: 10,
    capacityMultiplier: 1
  };
}

export function AddShieldsAndManeuvrability(app, html, data) {
  if (data.system.details?.type?.value == 'ship' || data.system.vehicleType == "space") {
    const tidyConstants = game.modules.get('tidy5e-sheet').api.constants;
    html = $(html);
    data.actor.flags.shieldvalue ||= 0;
    data.actor.flags.shieldmax ||= 0;
    data.actor.flags.maneufrability ||= "";

    if (html.hasClass("tidy5e-sheet")) {
      var fillAmount = Math.ceil(data.actor.flags.shieldvalue * 100 / data.actor.flags.shieldmax);

      let shieldField = $(`<div data-tidy-render-scheme="handlebars" class="portrait-hp svelte-l1hffv" style="bottom:1.25rem;" title="Shield Points">
        <div class="resource-container svelte-129gcyy">
          <div class="bar null svelte-qx955f" style="width: ${fillAmount}%; --bar-color:var(--t5e-inspiration-text-shadow-hover-color);"></div>
          <input type="text" placeholder="0" value="${data.actor.flags.shieldvalue}" class="resource-value" maxlength="5" aria-describedby="tooltip" title="Current Shield Points" name="flags.shieldvalue">
          <span class="resource-separator">/</span>
          <input type="text" placeholder="0" value="${data.actor.flags.shieldmax}" class="resource-max" maxlength="5" aria-describedby="tooltip" title="Maximum Shield Points" name="flags.shieldmax">
        </div>
      </div>`);

      html.find(".portrait-hp").after(shieldField);

      //-----------------------------------//

      let maneuvrabilityField = $(`<h4 data-tidy-render-scheme="handlebars">Maneuvrability</h4><input data-tidy-render-scheme="handlebars" name="flags.maneufrability" style="height:16px; width: 30px;" type="text" placeholder="—" value="${data.actor.flags.maneufrability}" data-tooltip="Maneuvrability in degrees">`);

      html.find(".movement").find(".configure").after(maneuvrabilityField);

      //-----------------------------------//
      let attackList;
      if (data.isNPC) {
        let inventoryList = html.find(`.${tidyConstants.SHEET_PARTS.ITEM_TABLE}`).eq(0);
        attackList = inventoryList.children().eq(1).children().eq(0);
      }

      if (data.isVehicle) {
        let inventoryList = html.find(`.${tidyConstants.SHEET_PARTS.ITEM_TABLE}`).eq(4);
        attackList = inventoryList.children().eq(1).children().eq(0);
      }

      for (const [key, value] of Object.entries(attackList.children())) {
        if (!isNaN(key) && value.nodeName != "FOOTER") {
          let foundItem = data.items.find(x => x.id == $(value)[0].dataset.itemId);
          if (foundItem.system.properties.has('fixed') && foundItem.flags.darkmatter?.position) {
            let position = $(`<span data-tidy-render-scheme="handlebars" style="flex: 0 0 85px; color: var(--t5e-tertiary-color);">(${positionObject[foundItem.flags.darkmatter.position]})</span>`);
            $(value).find(".item-quantity").after(position);
          }
        }
      }

      //-----------------------------------//
      if (data.isNPC) {
        // FIXME: Fix to use new searching by types when is added
        let inventoryList = $(html).find(`[data-tidy-sheet-part=${tidyConstants.SHEET_PARTS.NPC_ABILITIES_CONTAINER}]`).find('div:contains("Inventory")');

        if (inventoryList.length > 0) {
          inventoryList = $(inventoryList[0]).parent().parent().find(".item-table-body");
          for (const [key, value] of Object.entries(inventoryList.children())) {
            if (!isNaN(key) && value.nodeName != "FOOTER") {
              let foundItem = data.items.find(x => x.id == $(value)[0].dataset.itemId);
              if (foundItem.system.type.value == 'vehicle') {
                // FIXME: Value input doesn't save.
                value.querySelector(".item-table-cell").insertAdjacentHTML("afterbegin", `<span data-tidy-render-scheme="handlebars" style="font-size: 10px; margin: 0 -3px 0 3px; color: var(--t5e-tertiary-color);">
                  <input data-tidy-field="system.hp.value" style="height:16px; width: 16px; font-size: 16px" type="text" min="0" max="${foundItem.system.hp.max}" placeholder="0" value="${foundItem.system.hp.value}">
                  <span class="resource-separator">/</span>
                  <label>${foundItem.system.hp.max}</label>
                </span>`);
              }
            }
          }
        }
      }
    }
    else {
      let shieldField = $(`<li class="attribute shield">
      <h4 class="attribute-name box-title">Shield Points</h4>
      <div class="attribute-value multiple">
        <input name="flags.shieldvalue" type="text" data-dtype="Number" value="${data.actor.flags.shieldvalue}" placeholder="—" data-tooltip="Current Shield Points">
        <span class="sep"> / </span>
        <input name="flags.shieldmax" type="text" data-dtype="Number" value="${data.actor.flags.shieldmax}" placeholder="—" data-tooltip="Max Shield Points">
      </div>
    </li>`);

      html.find(".health").after(shieldField);

      //-----------------------------------//

      let maneuvrabilityField = $(`<span>
        Maneuvrability:<input name="flags.maneufrability" style="width:30px" type="text" placeholder="—" value="${data.actor.flags.maneufrability}" data-tooltip="Maneuvrability in degrees">
      </span>`)

      html.find(".movement").find(".attribute-footer").children().eq(0).after(maneuvrabilityField);

      //-----------------------------------//

      let attackList;
      if (data.isNPC) {
        let inventoryList = html.find(".inventory-list");
        inventoryList.children().eq(0).children().eq(0).after(`<div class="item-detail" style="flex: 0 0 85px">Position</div>`);

        attackList = inventoryList.children().eq(1);
      }
      if (data.isVehicle) {
        let inventoryList = html.find(".inventory-list");
        inventoryList.children().eq(8).children().eq(0).after(`<div class="item-detail" style="flex: 0 0 85px">Position</div>`);

        attackList = inventoryList.children().eq(9);
      }

      for (const [key, value] of Object.entries(attackList.children())) {
        if (!isNaN(key)) {
          let foundItem = data.items.find(x => x.id == $(value)[0].dataset.itemId);
          if (foundItem.system.properties.has('fixed') && foundItem.flags.darkmatter?.position) {
            let position = $(`<span class="item-detail" style="flex: 0 0 85px">(${positionObject[foundItem.flags.darkmatter.position]})</span>`);
            $(value).children().eq(0).after(position);
          }
        }
      }
    }
  }
}