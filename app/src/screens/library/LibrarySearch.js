import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text, Content, Segment } from 'native-base';
import { Lists } from "../../components";
import styles from "./styles";
import { getlang } from '../../config/constants';
import multilingual from '../../config/multilingual';

class LibrarySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredContent:[],
      favorContents: [],
      showAll: true,
      searchText: '',
    };
    this.content = this.props.navigation.state.params.content;

    this.updateSearch = function(text){
      if (text == "") {
        this.setState({
          filteredContent: [],
          favorContents: [],
          searchText: text,
        });
        return;
      }

      text = text.toUpperCase();

      var filteredContent = [];
      const favorContents = [];
      var content = this.content;
      for (var i = 0; i < content.length; i++){

        if (content[i].categories.toUpperCase().includes(text)){
          filteredContent.push(content[i]);
          if (content[i].favorite_content_id !== 'NULL') {
            favorContents.push(content[i])
          }
          continue;
        }

        if (content[i].tags.toUpperCase().includes(text)){
          filteredContent.push(content[i]);
          if (content[i].favorite_content_id !== 'NULL') {
            favorContents.push(content[i])
          }
          continue;
        }

        if (content[i].title.toUpperCase().includes(text)){
          filteredContent.push(content[i]);
          if (content[i].favorite_content_id !== 'NULL') {
            favorContents.push(content[i])
          }
          continue;
        }
      }

      this.setState({
        filteredContent,
        favorContents,
        searchText: text,
      });
    };

    setTimeout(() => {this.updateSearch(this.props.navigation.state.params.searchText)}, 200);
  }

  componentDidMount() {
    getlang().then(lang => {
      this.setState({lang})
    })
  }

  updateFavorite(content_id) {
    this.props.navigation.state.params.updateFavorite(content_id)
    const contents = [...this.content]
    const index = contents.findIndex(item => item.content_id === content_id)
    if (index !== -1) {
      if (contents[index].favorite_content_id != "NULL"){
        contents[index] = {
          ...contents[index],
          favorite_content_id:"NULL",
        }
      } else {
        contents[index] = {
          ...contents[index],
          favorite_content_id:"1",
        }
      }
      this.content = contents
      setTimeout(() => {this.updateSearch(this.state.searchText)}, 200);
    }
  }

  render() {
    const {lang} = this.state
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input autoFocus={this.props.navigation.state.params.autofocus}
              placeholder="Search"
              defaultValue={this.state.searchText}
              onChangeText={(text) => this.updateSearch(text)}  />
            <Icon name="ios-close-circle-outline" onPress={() => this.updateSearch('')} />
          </Item>
          <Button
            onPress={() => this.props.navigation.navigate("_dashboard")}
            transparent>
            <Text>{multilingual.CANCEL[lang]}</Text>
          </Button>
        </Header>
        <Segment style={{paddingLeft:10, paddingRight:10}}>
          <Button
            first
            active={this.state.showAll}
            onPress={() => this.setState({showAll: true})}
            style={this.state.showAll
              ? {alignItems:"center", justifyContent:"center", width:"50%", backgroundColor:"#0d9ddb"}
              : {alignItems:"center", justifyContent:"center", width:"50%"}
            }
          >
            <Text>{multilingual.ALL[lang]}</Text>
          </Button>
          <Button
            last
            active={!this.state.showAll}
            onPress={() => this.setState({showAll: false})}
            style={this.state.showAll
              ? {alignItems:"center", justifyContent:"center", width:"50%"}
              : {alignItems:"center", justifyContent:"center", width:"50%", backgroundColor:"#0d9ddb"}
            }
          >
            <Text>{multilingual.FAVORITES[lang]}</Text>
          </Button>
        </Segment>
        <Content style={styles.content}>
          {this.state.showAll ?
            <Lists.StudyTasksList
              updateFavorite={(content_id) => this.updateFavorite(content_id)}
              content={this.state.filteredContent}
            /> :
            <Lists.StudyTasksList
              updateFavorite={(content_id) => this.updateFavorite(content_id)}
              content={this.state.favorContents}
            />
          }
        </Content>
      </Container>
    );
  }
}

export default LibrarySearch;