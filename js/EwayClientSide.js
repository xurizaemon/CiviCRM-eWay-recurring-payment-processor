/**
 * Created by eileen on 28/09/2015.
 */

/**
 * Encrypt confidential data fields before the form is submitted.
 *
 * @param field
 * @param string apiKey
 */
function encryptField(field, apiKey) {
  var existingValue = field.val();
  if (isFieldEncrypted(field)) {
    return;
  }
  field.val(eCrypt.encryptValue(existingValue, apiKey));
}

/**
 * Hide fields that have already been encrypted.
 */
function hideEncryptedFields(field) {
  if (!isFieldEncrypted(field)) {
    return;
  }
  field.hide();
  // @todo need a message saying hidden because encrypted & a way to clear that &
  // re-enter.
}

/**
 * Is the field already encrypted.
 *
 * @param field
 */
function isFieldEncrypted(field) {
  if (field.length == 0) {
    return;
  }
  var existingValue = field.val();
  if (existingValue.length !=0 && existingValue.substr(0, 9) == 'eCrypted:') {
    return true;
  }
  return false;
}

hideEncryptedFields(cj('#credit_card_number'));
hideEncryptedFields(cj('#cvv2'));

cj('#crm-main-content-wrapper form').submit(function() {
    encryptField(cj('#credit_card_number'), CRM.eway.ewayKey);
    encryptField(cj('#cvv2'), CRM.eway.ewayKey);
  }
);
