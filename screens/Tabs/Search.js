import React from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default class extends React.Component {
  // static 프로퍼티는 컴포넌트가 정의되기전에 생성됨
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <SearchBar
        value={navigation.getParam("term", "")}
        onChange={navigation.getParam("onChange", () => null)}
        onSubmit={navigation.getParam("onSubmit", () => null)}
      />
    )
  });

  constructor(props) {
    super(props);
    const { navigation } = props;
    // screen이니까 props에 navigation이 전달됨
    this.state = {
      term: ""
    };
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit
    });
  }

  onChange = text => {
    const { navigation } = this.props;
    this.setState({ term: text });
    navigation.setParams({ term: text });
  };
  onSubmit = () => {
    console.log("Submit");
  };
  render() {
    return (
      <View>
        <Text>Search</Text>
      </View>
    );
  }
}
