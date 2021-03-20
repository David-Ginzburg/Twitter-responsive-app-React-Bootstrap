import React from 'react';
import { ListGroup } from 'reactstrap';

import './post-list.css';

import PostListItem from '../post-list-item/post-list-item';

const PostList = ({posts}) => {

    const elements = posts.map(item => {
        const {id, ...itemProps} = item;
        return (
            <li key={item.id} className='list-group-item'>
                <PostListItem {...itemProps}/>
            </li>)
    });

    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}

export default PostList;