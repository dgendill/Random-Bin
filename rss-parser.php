<?php
// Reads content from an RSS Feed

$siteName = "http://www.site.com/"
$rss = new DOMDocument();
$rss->load($siteName . '/rss.php?action=featuredproducts&type=atom');
$doc = new DOMXPath($rss);
$doc->registerNamespace('atom', 'http://www.w3.org/2005/Atom');
$entries = $doc->query('/atom:feed/atom:entry');

$l = $entries->length;
for ($a = 0; $a < $l; $a++) {
  $currentEntry = $entries->item($a);
  $name = $doc->query('atom:title', $currentEntry );
  echo $name->item(0)->nodeValue . "<br>";
}

?>