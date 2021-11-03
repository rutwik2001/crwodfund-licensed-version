import React from 'react';
import { Menu, Item, Icon } from 'semantic-ui-react';
import {Link} from '../routes';

const Header = (props) => {
    return (
        <Menu style={{ marginTop: '20px' }} size='large'>
          <Link route='/'><a>
        <Menu.Item
          name='CrowdFund'
        /></a></Link>

        <Menu.Menu position='right'>
        <Link route='/'><a>
        <Menu.Item
          name='Campaigns'
        /></a></Link>
        <Link route='/campaigns/new'><a>
        <Menu.Item
          icon='add'
        /></a></Link>
        
          
        </Menu.Menu>
      </Menu>
    )
}

export default Header;