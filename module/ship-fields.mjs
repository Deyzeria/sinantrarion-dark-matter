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
    data.actor.flags.shieldvalue ||= 0;
    data.actor.flags.shieldmax ||= 0;
    data.actor.flags.maneufrability ||= "";

    if (html.hasClass("tidy5e-sheet")) {
      var fillAmount =  Math.ceil(data.actor.flags.shieldvalue * 100 / data.actor.flags.shieldmax);

      let shieldField = $(`<div class="portrait-hp svelte-l1hffv" style="bottom:1.25rem;" title="Shield Points">
        <div class="resource-container svelte-129gcyy">
          <div class="bar null svelte-qx955f" style="width: ${fillAmount}%; --bar-color:var(--t5e-inspiration-text-shadow-hover-color);"></div>
          <input type="text" placeholder="0" value="${data.actor.flags.shieldvalue}" class="resource-value" maxlength="5" aria-describedby="tooltip" title="Current Shield Points" name="flags.shieldvalue">
          <span class="resource-separator">/</span>
          <input type="text" placeholder="0" value="${data.actor.flags.shieldmax}" class="resource-max" maxlength="5" aria-describedby="tooltip" title="Maximum Shield Points" name="flags.shieldmax">
        </div>
      </div>`);

      html.find(".portrait-hp").after(shieldField);

      //-----------------------------------//

      let maneuvrabilityField = $(`<h4>Maneuvrability</h4><input name="flags.maneufrability" style="height:16px; width: 30px;" type="text" placeholder="—" value="${data.actor.flags.maneufrability}" data-tooltip="Maneuvrability in degrees">`);

      html.find(".movement").find(".configure").after(maneuvrabilityField);

      //-----------------------------------//

      let attackList;
      if (data.isNPC) {
        let inventoryList = html.find(".item-table").eq(0);
        attackList = inventoryList.children().eq(1).children().eq(0);
      }

      if (data.isVehicle) {
        let inventoryList = html.find(".item-table").eq(4);
        attackList = inventoryList.children().eq(1).children().eq(0);
        
      }

      for (const [key, value] of Object.entries(attackList.children())) {
        if (!isNaN(key) && value.nodeName != "FOOTER") {
          let foundItem = data.items.find(x => x.id == $(value)[0].dataset.itemId);
          if (foundItem.system.properties.has('fixed') && foundItem.flags.darkmatter?.position) {
            let position = $(`<span style="flex: 0 0 85px; color: var(--t5e-tertiary-color);">(${positionObject[foundItem.flags.darkmatter.position]})</span>`);
            $(value).find(".item-quantity").after(position);
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

    // ------------------------------------- //
  }

  // TODO: For NPC's, if Ship, if has any in inventory Ship Equpment, render its hitpoints pls
}