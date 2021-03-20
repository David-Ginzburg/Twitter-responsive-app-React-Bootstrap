import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn React', important: true, like: false, id: 1},
                {label: 'That is so good', important: false, like: true, id: 2},
                {label: 'I need a break...', important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.searchPost = this.searchPost.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onUpdateFilter = this.onUpdateFilter.bind(this);

        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const newArr = data.filter(item => item.id !== id);
            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        if (body) {
            const newItem = {
                label: body,
                important: false,
                like: false,
                id: this.maxId++
            }
            this.setState(({data}) => {
                const newArr = [...data, newItem];
                return {
                    data: newArr
                }
            });
        }
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            
            const oldElem = data[index];
            const updatedElem = {...oldElem, important: !oldElem.important}

            const newArr = [...before, updatedElem, ...after];
            return {
                data: newArr
            }
        });
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            
            const oldElem = data[index];
            const updatedElem = {...oldElem, like: !oldElem.like}

            const newArr = [...before, updatedElem, ...after];
            return {
                data: newArr
            }
        });
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => item.label.indexOf(term) > -1);
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like);
        }

        return items;
    }

    onUpdateFilter(filter) {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;

        const total = data.length;
        const liked = data.filter(item => item.like).length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader
                    total={total}
                    liked={liked}
                />
                <div className="search-panel d-flex">
                    <SearchPanel 
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onUpdateFilter={this.onUpdateFilter}
                    />
                </div>
                <PostList
                    posts={visiblePosts} 
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm 
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}