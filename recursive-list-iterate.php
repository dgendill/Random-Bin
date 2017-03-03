<?php

$catArray = array();
$html = new DOMDocument();
$html->loadHTMLFile('file.html');
$html = new DOMXPath($html);
$context = $html->query("//div[@class='SitemapCategories']/ul")->item(0);

$root = $html->query("li", $context);

echo json_encode(doLevel($root));

function doLevel($level) {
  // $level is DOMNodeList
  // returns array
  return iterate($level, 'getChildListItems');
}

$l = $context->length;
echo $root->length;

function iterate($nodeList, $callback = '') {
  global $html;
  // takes DOMNodeList and interates over it
  $l = $nodeList->length;
  $categoryList = array();
  for ($a = 0; $a < $l; $a++) {
    // $nodeList->item(a) is DOMNode
    if ($callback !== '') {
      $categories = doLevel($callback($nodeList->item($a)));
      $link = $html->query("a", $nodeList->item($a));
      if ($link->length > 0) { array_push($categoryList, $link->item(0)->nodeValue); }
      if (count($categories) > 0) { array_push($categoryList, $categories); }
     }
  }
   return $categoryList;
}

function getChildListItems($domNode) {
  // accepts DOMNode returns DOMNodeList
  global $html;
  $listItems = $html->query("ul/li", $domNode);
  return $listItems;
}

?>
