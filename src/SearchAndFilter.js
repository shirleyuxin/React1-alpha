class SearchAndFilter {

  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    
    if(minimumCredits !== '') {
      let searchItemMC = [];
      for(const MC of Object.values(courses)) {
        if(MC.credits >= parseInt(minimumCredits)) {
          searchItemMC.push(MC);
        }
      }
      courses = searchItemMC;
    }

    if(maximumCredits !== '') {
      let searchItemMax = [];
      for(const max of Object.values(courses)) {
        if(max.credits <= parseInt(maximumCredits)) {
          searchItemMax.push(max);
        }
      }
      courses = searchItemMax;
    }
      
    if(subject !== 'All') {
      let searchsubject = [];
      
      for(const sub of Object.values(courses)) {
        //console.log(sub.subject);
        if(sub.subject === subject) {
          searchsubject.push(sub);
        }
      }
      //console.log(searchsubject);
      courses = searchsubject;
    }

    if(search.length >0)  {
      //console.log(search);
      let searchKey = [];
      for(const skey of Object.values(courses)) {
        for(var i = 0; i < skey.keywords.length; i++) {
          if(skey.keywords[i].includes(search)) {
            searchKey.push(skey);
            break;
          }
        }
      }
      //console.log(searchKey);
      courses = searchKey;
    }

    return courses;
  }
}

export default SearchAndFilter;
