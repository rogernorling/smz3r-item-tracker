(function() {
    'use strict';

    const _styled = styled.default;

    const Slot = _styled.div`
      width: 64px;
      height: 64px;
      position: relative;
    `;
    const ActiveItem = _styled(Slot)`
      filter: contrast(${props => props.active ? 100 : 80}%)
              brightness(${props => props.active ? 100 : 30}%);
    `;
    const ActiveBaseItem = _styled(ActiveItem)`
      position: absolute;
    `;
    
    const Item = (props) =>
      <ActiveItem
        className={classNames(props.name, props.value && `${props.name}--active`)}
        active={props.value}
        onClick={() => props.onToggle(props.name)} />;

    const LeveledItem = (props) =>
      <ActiveItem
        className={classNames(props.name, props.value && `${props.name}--active-${props.value}`)}
        active={props.value}
        onClick={() => props.onLevel({ raise: props.name })}
        onContextMenu={(e) => { props.onLevel({ lower: props.name }); e.preventDefault(); }} />

    const SplitItem = _styled(ActiveItem)`
      width: 32px;
      position: absolute;
    `;
    const RightSplitItem = _styled(SplitItem)`
      right: 0;
    `;

    const SplitItems = (props) => {
        const { left_name, left_value, right_name, right_value } = props;
        return <Slot>
          <SplitItem
            className={classNames(left_name, left_value && `${left_name}--active`)}
            active={left_value}
            onClick={() => props.onToggle(left_name)} />
          <RightSplitItem
            className={classNames(right_name, left_value && `${right_name}--active`)}
            active={right_value}
            onClick={() => props.onToggle(right_name)} />
        </Slot>;
    }

    const StackedItems = (props) => {
        const { top_name, top_value, bottom_name, bottom_value } = props;
        return <Slot>
          <ActiveBaseItem
            className={classNames(bottom_name, bottom_value && `${bottom_name}--active`)}
            active={bottom_value}
            onClick={() => props.onToggle(bottom_name)} />
          <SplitItem
            className={classNames(top_name, top_value && `${top_name}--active`)}
            active={top_value}
            onClick={() => props.onToggle(top_name)} />
        </Slot>;
    }

    const OutlinedText = _styled.span`
      display: table-cell;
      font-weight: bold;
      text-shadow:
        -2px -2px black,  0px -2px black,
         2px -2px black,  2px  0px black,
         2px  2px black,  0px  2px black,
        -2px  2px black, -2px  0px black;
      user-select: none;
    `;

    const TextHolder = _styled(Slot)`
      position: absolute;
      display: table;
    `;
    const MedallionText = _styled(OutlinedText)`
      color: white;
      font-size: 18px;
      text-align: ${props => props.second ? 'right' : 'left'};
      vertical-align: ${props => props.second ? 'bottom' : 'top'};
    `;

    const MedallionItem = (props) =>
      <Slot
        onClick={() => props.onToggle(props.name)}
        onContextMenu={(e) => { props.onAccess(props.name); e.preventDefault(); }}>
        <ActiveBaseItem
          className={classNames(props.name, props.name && `${props.name}--active`)}
          active={props.value} />
        {props.access.turtle && <TextHolder><MedallionText>TR</MedallionText></TextHolder>}
        {props.access.mire && <TextHolder><MedallionText second={true}>MM</MedallionText></TextHolder>}
      </Slot>;

    const ActiveTextItem = _styled(ActiveItem)`
      display: table;
    `;
    const AmmoText = _styled(OutlinedText)`
      color: hsl(45, 100%, ${props => 50 * (1 + (props.grade||1))}%);
      font-size: 24px;
      text-align: center;
      vertical-align: bottom;
    `;

    const AmmoItem = (props) =>
      <ActiveTextItem
        className={props.name}
        active={props.value}
        onClick={() => props.onLevel({ raise: props.name })}
        onContextMenu={(e) => { props.onLevel({ lower: props.name }); e.preventDefault(); }}>
        {props.value ? <AmmoText grade={props.grade}>{props.value * 5}</AmmoText> : null}
      </ActiveTextItem>;

    const TankText = _styled(OutlinedText)`
      color: hsl(45, 100%, ${props => 50 * (1 + (props.grade||1))}%);
      font-size: 24px;
      text-align: right;
      vertical-align: bottom;
    `;

    const TankItem = (props) =>
      <ActiveTextItem
        className="tank"
        active={props.value}
        onClick={() => props.onLevel({ raise: 'tank' })}
        onContextMenu={(e) => { props.onLevel({ lower: 'tank' }); e.preventDefault(); }}>
        {props.value ? <TankText grade={props.grade}>{props.value}</TankText> : null}
      </ActiveTextItem>

    const Prize = _styled.div`
      width: 32px;
      height: 32px;
      right: 0;
      bottom: 0;
      position: absolute;
      filter: contrast(${props => props.active ? 100 : 80}%)
              brightness(${props => props.active ? 100 : 50}%)
              opacity(${props => !props.assumed ? 100 : !props.active ? 80 : 60}%);
    `;

    const Z3Boss = (props) => {
        const name = props.name;
        const { complete, prize } = props.value;
        return <Slot>
          <ActiveBaseItem
            className={name}
            active={!complete}
            onClick={() => props.onComplete(name)} />
          <Prize
            className={prize}
            active={complete}
            assumed={props.assumed && prize === 'crystal'}
            onClick={() => props.onPrize({ raise: name })}
            onContextMenu={(e) => { props.onPrize({ lower: name }); e.preventDefault(); }} />
        </Slot>;
    };

    const StyledGoldenFour = _styled.div`
      width: 128px;
      height: 128px;
      position: relative;
    `;
    const Statue = _styled(StyledGoldenFour)`
      position: absolute;
    `;
    const RidleyTarget = _styled(Statue)`
      width: 128px;
      height: 58px;
    `;
    const KraidTarget = _styled(Statue)`
      width: 46px;
      height: 70px;
      bottom: 0;
    `;
    const PhantoonTarget = _styled(Statue)`
      width: 42px;
      height: 70px;
      left: 46px;
      bottom: 0;
    `;
    const DraygonTarget = _styled(Statue)`
      width: 40px;
      height: 70px;
      right: 0;
      bottom: 0;
    `;

    const GoldenFour = (props) => {
        const { ridley, kraid, phantoon, draygon } = props.value;
        return <StyledGoldenFour>
          <Statue className="golden-four" />
          {ridley.complete && <Statue className="golden-four---ridley" />}
          {kraid.complete && <Statue className="golden-four---kraid" />}
          {phantoon.complete && <Statue className="golden-four---phantoon" />}
          {draygon.complete && <Statue className="golden-four---draygon" />}
          <RidleyTarget onClick={() => props.onComplete('ridley')} />
          <KraidTarget onClick={() => props.onComplete('kraid')} />
          <PhantoonTarget onClick={() => props.onComplete('phantoon')} />
          <DraygonTarget onClick={() => props.onComplete('draygon')} />
        </StyledGoldenFour>;
    };

    const GridTracker = _styled.div`
      display: grid;
      grid-template-columns: repeat(2, min-content);
      grid-template-rows: repeat(2, min-content);
    `;
    const GridZ3Items = _styled.div`
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, 1fr);
    `;
    const GridZ3Bosses = _styled.div`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
    `;
    const GridSmItems = _styled.div`
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(3, 1fr);
    `;
    const GridSmBosses = _styled.div`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
    `;
    const GridItemGoldenFour = _styled.div`
      grid-column: 1 / -1;
      grid-row: 2 / -1;
      display: flex;
      justify-content: center;
    `;

    const Tracker = (props) => {
        const { items, bosses, medallions, assumed, tank_grade, powerbomb_grade } = props;
        const { onToggle, onLevel, onComplete, onPrize, onAccess } = props;
        return (
          <GridTracker>
            <GridZ3Items>
              <Item name="bow" value={items.bow} onToggle={onToggle} />
              <Item name="hammer" value={items.hammer} onToggle={onToggle} />
              <Item name="hookshot" value={items.hookshot} onToggle={onToggle} />
              <SplitItems
                left_name="mushroom" left_value={items.mushroom}
                right_name="powder" right_value={items.powder} onToggle={onToggle} />
              <Item name="book" value={items.book} onToggle={onToggle} />
              <Item name="firerod" value={items.firerod} onToggle={onToggle} />
              <Item name="icerod" value={items.icerod} onToggle={onToggle} />
              <MedallionItem
                name="bombos" value={items.bombos} access={medallions.bombos}
                onToggle={onToggle} onAccess={onAccess} />
              <MedallionItem
                name="ether" value={items.ether} access={medallions.ether}
                onToggle={onToggle} onAccess={onAccess} />
              <MedallionItem
                name="quake" value={items.quake} access={medallions.quake}
                onToggle={onToggle} onAccess={onAccess} />
              <Item name="lamp" value={items.lamp} onToggle={onToggle} />
              <Item name="somaria" value={items.somaria} onToggle={onToggle} />
              <StackedItems
                top_name="shovel" top_value={items.shovel}
                bottom_name="flute" bottom_value={items.flute} onToggle={onToggle} />
              <StackedItems
                top_name="byrna" top_value={items.byrna}
                bottom_name="cape" bottom_value={items.cape} onToggle={onToggle} />
              <Item name="mirror" value={items.mirror} onToggle={onToggle} />
              <StackedItems
                top_name="halfmagic" top_value={items.halfmagic}
                bottom_name="bottle" bottom_value={items.bottle} onToggle={onToggle} />
              <Item name="boots" value={items.boots} onToggle={onToggle} />
              <LeveledItem name="glove" value={items.glove} onLevel={onLevel} />
              <Item name="flippers" value={items.flippers} onToggle={onToggle} />
              <Item name="moonpearl" value={items.moonpearl} onToggle={onToggle} />
            </GridZ3Items>
            <GridZ3Bosses>
              <Z3Boss name="armos" value={bosses.armos} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
              <Z3Boss name="lanmolas" value={bosses.lanmolas} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
              <Z3Boss name="moldorm" value={bosses.moldorm} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
              <Z3Boss name="helmasaur" value={bosses.helmasaur} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
              <Z3Boss name="arrghus" value={bosses.arrghus} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
              <Z3Boss name="mothula" value={bosses.mothula} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
              <Item name="agahnim" value={items.agahnim} onToggle={onToggle} />
              <Z3Boss name="blind" value={bosses.blind} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
              <Z3Boss name="kholdstare" value={bosses.kholdstare} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
              <LeveledItem name="sword" value={items.sword} onLevel={onLevel} />
              <Z3Boss name="vitreous" value={bosses.vitreous} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
              <Z3Boss name="trinexx" value={bosses.trinexx} assumed={assumed}
                onComplete={onComplete} onPrize={onPrize} />
            </GridZ3Bosses>
            <GridSmItems>
              <Item name="charge" value={items.charge} onToggle={onToggle} />
              <Item name="ice" value={items.ice} onToggle={onToggle} />
              <Item name="wave" value={items.wave} onToggle={onToggle} />
              <Item name="plasma" value={items.plasma} onToggle={onToggle} />
              <TankItem value={items.tank} grade={tank_grade} onLevel={onLevel} />
              <Item name="varia" value={items.varia} onToggle={onToggle} />
              <Item name="morph" value={items.morph} onToggle={onToggle} />
              <Item name="spring" value={items.spring} onToggle={onToggle} />
              <Item name="hijump" value={items.hijump} onToggle={onToggle} />
              <Item name="speed" value={items.speed} onToggle={onToggle} />
              <Item name="gravity" value={items.gravity} onToggle={onToggle} />
              <Item name="bomb" value={items.bomb} onToggle={onToggle} />
              <Item name="screw" value={items.screw} onToggle={onToggle} />
              <Item name="space" value={items.space} onToggle={onToggle} />
              <Item name="grapple" value={items.grapple} onToggle={onToggle} />
            </GridSmItems>
            <GridSmBosses>
              <AmmoItem name="missile" value={items.missile} onLevel={onLevel} />
              <AmmoItem name="super" value={items.super} onLevel={onLevel} />
              <AmmoItem name="powerbomb" value={items.powerbomb} grade={powerbomb_grade} onLevel={onLevel} />
              <GridItemGoldenFour>
                <GoldenFour value={bosses} onComplete={onComplete} />
              </GridItemGoldenFour>
            </GridSmBosses>
          </GridTracker>
        );
    };

    class App extends React.Component {
        state = { items: items(), bosses: bosses(), medallions: medallions() }

        render() {
            return <Tracker {...this.state}
              assumed={this.assumed()}
              tank_grade={this.tank_grade()}
              powerbomb_grade={this.powerbomb_grade()}
              onToggle={this.toggle}
              onLevel={this.level}
              onComplete={this.complete}
              onPrize={this.prize}
              onAccess={this.medallion} />;
        }

        assumed() {
            const count = _.transform(this.state.bosses,
                (a, x) => x.prize && _.update(a, x.prize, v => (v||0) + 1));
            return !(
                count['crystal-red'] === 2 &&
                count['pendant'] === 2 &&
                count['pendant-green'] === 1
            );
        }

        tank_grade() {
            const mode = 'normal';
            const tank = this.state.items.tank;
            const grade = {
                1: { normal: 1/3, hard: 1/4 },
                2: { normal: 2/3, hard: 2/4 },
                3: { normal: 3/3, hard: 3/4 },
                4: { normal: 3/3, hard: 3/4 }
            }[tank];
            return grade ? grade[mode] : 1;
        }

        powerbomb_grade() {
            return this.state.items.powerbomb >= 2 ? 1 : .5
        }

        toggle = (name) => {
            const items = this.state.items;
            this.setState({ items: { ...items, [name]: !items[name] } });
        }

        level = ({ raise, lower }) => {
            const name = raise || lower;
            const delta = raise ? 1 : -1;
            const items = this.state.items;
            const modulo = 1 + items.limit[name];
            this.setState({ items: { ...items, [name]: (items[name] + modulo + delta) % modulo } });
        }

        medallion = (name) => {
            const medallions = this.state.medallions;
            const medallion = medallions[name];
            this.setState({ medallions: {
              ...medallions, [name]: {
                turtle: !medallion.turtle,
                mire: medallion.turtle != medallion.mire
              }
            } });
        }

        complete = (name) => {
            const bosses = this.state.bosses;
            const boss = bosses[name];
            this.setState({ bosses: { ...bosses, [name]: { ...boss, complete: !boss.complete } } });
        }

        prize = ({ raise, lower }) => {
            const name = raise || lower;
            const delta = raise ? 1 : -1;
            const bosses = this.state.bosses;
            const boss = bosses[name];
            const index = prize_order.indexOf(boss.prize);
            const modulo = prize_order.length;
            this.setState({ bosses: {
                ...bosses, [name]: {
                    ...boss, prize: prize_order[(index + modulo + delta) % modulo]
                }
            } });
        }
    }

    const prize_order = ['crystal', 'pendant', 'pendant-green', 'crystal-red'];

    const items = () => {
        return {
            bow: false,
            somaria: false,
            hookshot: false,
            mushroom: false,
            powder: false,
            book: false,
            firerod: false,
            icerod: false,
            bombos: false,
            ether: false,
            quake: false,
            lamp: false,
            hammer: false,
            shovel: false,
            flute: false,
            byrna: false,
            cape: false,
            mirror: false,
            halfmagic: false,
            bottle: false,
            boots: false,
            glove: 0,
            flippers: false,
            moonpearl: false,
            agahnim: false,
            sword: 0,
            charge: false,
            ice: false,
            wave: false,
            plasma: false,
            tank: 0,
            varia: false,
            gravity: false,
            morph: false,
            bomb: false,
            spring: false,
            screw: false,
            hijump: false,
            space: false,
            speed: false,
            grapple: false,
            missile: 0,
            super: 0,
            powerbomb: 0,
            limit: {
              glove: 2,
              sword: 2,
              tank: 18,
              missile: 40,
              super: 17,
              powerbomb: 10
            }
        };
    };

    const bosses = () => {
        return {
            armos: { complete: false, prize: 'crystal' },
            lanmolas: { complete: false, prize: 'crystal' },
            moldorm: { complete: false, prize: 'crystal' },
            helmasaur: { complete: false, prize: 'crystal' },
            arrghus: { complete: false, prize: 'crystal' },
            mothula: { complete: false, prize: 'crystal' },
            blind: { complete: false, prize: 'crystal' },
            kholdstare: { complete: false, prize: 'crystal' },
            vitreous: { complete: false, prize: 'crystal' },
            trinexx: { complete: false, prize: 'crystal' },
            ridley: { complete: false },
            kraid: { complete: false },
            phantoon: { complete: false },
            draygon: { complete: false }
        };
    };

    const medallions = () => {
        return {
            bombos: {},
            ether: {},
            quake: {}
        };
    };

    window.start = function() {
        ReactDOM.render(<App/>, document.getElementById('app'));
    };
}());
