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

/**
 * 
 * @param {*} app 
 * @param {Document} html 
 * @param {*} data 
 */
export function AddShieldsAndManeuvrability(app, html, data) {
  if (data.system.details?.type?.value == 'ship' || data.system.vehicleType == "space") {
    data.actor.flags.shieldvalue ||= 0;
    data.actor.flags.shieldmax ||= 0;
    data.actor.flags.maneufrability ||= "";

    if ($(html).hasClass("tidy5e-sheet")) {
      var fillAmount = Math.ceil(data.actor.flags.shieldvalue * 100 / data.actor.flags.shieldmax);

      html.querySelector(".portrait-hp").insertAdjacentHTML("afterbegin",
        `<div data-tidy-render-scheme="handlebars" class="portrait-hp svelte-l1hffv" style="bottom:1.25rem;" title="Shield Points">
          <div class="resource-container svelte-129gcyy">
            <div class="bar null svelte-qx955f" style="width: ${fillAmount}%; --bar-color:var(--t5e-inspiration-text-shadow-hover-color);"></div>
            <input type="text" placeholder="0" value="${data.actor.flags.shieldvalue}" class="resource-value" maxlength="5" aria-describedby="tooltip" title="Current Shield Points" name="flags.shieldvalue">
            <span class="resource-separator">/</span>
            <input type="text" placeholder="0" value="${data.actor.flags.shieldmax}" class="resource-max" maxlength="5" aria-describedby="tooltip" title="Maximum Shield Points" name="flags.shieldmax">
          </div>
        </div>`);

      //-----------------------------------//

      html.querySelector(".movement").insertAdjacentHTML("beforeend",
        `<h4 data-tidy-render-scheme="handlebars">Maneuvrability</h4><input data-tidy-render-scheme="handlebars" name="flags.maneufrability" style="height:16px; width: 30px;" type="text" placeholder="—" value="${data.actor.flags.maneufrability}" data-tooltip="Maneuvrability in degrees">`);

      //-----------------------------------//

      let attackList = html.querySelectorAll('[data-tidy-item-type="weapon"]');

      for (let i = 0; i < attackList.length; i++) {
        const element = attackList[i];
        let foundItem = data.items.find(x => x.id == element.dataset.itemId);
        if (foundItem.system.properties.has('fixed') && foundItem.flags.darkmatter?.position) {
          element.querySelector(".item-name").insertAdjacentHTML("beforeend",
            `<span data-tidy-render-scheme="handlebars" style="flex: 0 0 85px; color: var(--t5e-tertiary-color);">(${positionObject[foundItem.flags.darkmatter.position]})</span>`);
        }
      }

      //-----------------------------------//

      if (data.isNPC) {
        // FIXME: Fix to use new searching by types when is added
        let equipmentList = html.querySelectorAll('[data-tidy-item-type="equipment"]');
        for (let i = 0; i < equipmentList.length; i++) {
          const element = equipmentList[i];
          let foundItem = data.items.find(x => x.id == element.dataset.itemId);
          if (foundItem.system.type.value == 'vehicle') {
            // FIXME: Value input doesn't save.
            //<input data-tidy-field="system.hp.value" style="height:16px; width: 16px; font-size: 16px" type="text" min="0" max="${foundItem.system.hp.max}" placeholder="0" value="${foundItem.system.hp.value}">
            let extraColoring = foundItem.system.hp.value == 0 ? `color: red; font-weight:700;` : ``;
            element.querySelector(".item-table-cell").insertAdjacentHTML("afterbegin",
              `<span data-tidy-render-scheme="handlebars" style="font-size: 10px; margin: 0 -3px 0 3px; color: var(--t5e-tertiary-color);">
              <label style="font-size: 16px; ${extraColoring}">${foundItem.system.hp.value}</label>
              <span class="resource-separator">/</span>
              <label>${foundItem.system.hp.max}</label>
            </span>`);
          }
        }
      }

      //-----------------------------------//

      let shipFields = $(html).find('span:contains("Configure Ship")').parent();
      const flags = data.actor.flags;
      flags.darkmatter ||= {};
      flags.darkmatter.crew ||= {};
      const crew = flags.darkmatter.crew;

      shipFields.parent().find("button").remove();

      crew.captain ||= 0;
      crew.captain = parseInt(crew.captain);
      shipFields.append($(`<div data-tidy-render-scheme="handlebars" class="flexrow">
        <span>Captain: </span>
        <input style="${crew.captain == 0 ? "color: gray;" : ""} height: 18px;" name="flags.darkmatter.crew.captain" type="text" placeholder="0" value="${crew.captain}">
      </div>`));

      crew.dogfighter ||= 0;
      crew.dogfighterType ||= "";
      crew.dogfighter = parseInt(crew.dogfighter);
      shipFields.append($(`<div data-tidy-render-scheme="handlebars" class="flexrow">
        <span>Dogfighters: </span>
        <input style="${crew.dogfighter == 0 ? "color: gray;" : ""} height: 18px; flex: 0 0 25px;" name="flags.darkmatter.crew.dogfighter" type="text" placeholder="0" value="${crew.dogfighter}">
        <span class="flexrow" style="height: 18px; flex: 0 0 74px; font-size: 9px; padding-top: 4px">(<input style="height: 11px; text-align: center;" name="flags.darkmatter.crew.dogfighterType" type="text" placeholder="Type" value="${crew.dogfighterType}">)</span>
      </div>`));

      crew.engineer ||= 0;
      crew.engineer = parseInt(crew.engineer);
      shipFields.append($(`<div data-tidy-render-scheme="handlebars" class="flexrow">
        <span>Engineer: </span>
        <input style="${crew.engineer == 0 ? "color: gray;" : ""} height: 18px;" name="flags.darkmatter.crew.engineer" type="text" placeholder="0" value="${crew.engineer}">
      </div>`));

      crew.gunner ||= 0;
      crew.gunner = parseInt(crew.gunner);
      shipFields.append($(`<div data-tidy-render-scheme="handlebars" class="flexrow">
        <span>Gunners: </span>
        <input style="${crew.gunner == 0 ? "color: gray;" : ""} height: 18px;" name="flags.darkmatter.crew.gunner" type="text" placeholder="0" value="${crew.gunner}">
      </div>`));

      crew.pilot ||= 1;
      crew.pilot = parseInt(crew.pilot);
      shipFields.append($(`<div data-tidy-render-scheme="handlebars" class="flexrow">
        <span>Pilot: </span>
        <input style="${crew.pilot == 0 ? "color: gray;" : ""} height: 18px;" name="flags.darkmatter.crew.pilot" type="text" placeholder="0" value="${crew.pilot}">
      </div>`));

      crew.passenger ||= 0;
      crew.passenger = parseInt(crew.passenger);
      shipFields.append($(`<div data-tidy-render-scheme="handlebars" class="flexrow">
        <span>Passengers: </span>
        <input style="${crew.passenger == 0 ? "color: gray;" : ""} height: 18px;" name="flags.darkmatter.crew.passenger" type="text" placeholder="0" value="${crew.passenger}">
      </div>`));

      if(!data.isVehicle)
      {
        crew.cargo ||= "";
        shipFields.append($(`<div data-tidy-render-scheme="handlebars" class="flexrow">
          <span>Cargo: </span>
          <input style="height: 18px;" name="flags.darkmatter.crew.cargo" type="text" placeholder="0 lb" value="${crew.cargo}">
        </div>`));  
      }

      crew.cost ||= "";
      shipFields.append($(`<div data-tidy-render-scheme="handlebars" class="flexrow">
        <span>Cost: </span>
        <input style="height: 18px;" name="flags.darkmatter.crew.cost" type="text" placeholder="0 gp" value="${crew.cost}">
      </div>`));
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