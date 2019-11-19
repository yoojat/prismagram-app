import React from "react";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

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
      term: "",
      shouldFetch: false
    };
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit
    });
  }

  onChange = text => {
    const { navigation } = this.props;
    navigation.setParams({ term: text, shouldFetch: false });
  };
  onSubmit = () => {
    this.setState({ shouldFetch: true });
  };
  render() {
    const { term, shouldFetch } = this.state;
    return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
  }
}
